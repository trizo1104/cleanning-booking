const Booking = require("../models/booking");
const axios = require("axios");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const payment = async (req, res) => {
  const { amount, items } = req.body;
  const user = req.user;
  const transID = Math.floor(Math.random() * 1000000);
  const appTransId = `${moment().format("YYMMDD")}_${transID}`;

  const embeddata = {
    preferred_payment_methods: ["international_card"],
    redirecturl: `http://localhost:3000/checking-payment`,
    user: user.id,
    service: items[0].service,
    date: items[0].date,
    time: items[0].time,
    address: items[0].address,
    note: items[0]?.note || "",
    selectedOptionType: items[0]?.selectedOptionType || "",
    selectedPrice: amount,
    transactionId: appTransId,
  };

  const order = {
    app_id: config.app_id,
    app_trans_id: appTransId,
    app_user: user.id,
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embeddata),
    amount,
    description: "ZaloPay Booking",
    bank_code: "",
    callback_url: `${process.env.NGROK_URL}/api/payment-zalo/callback`,
  };

  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json(response.data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Payment failed", error: error.message });
  }
};

const paymentCallBack = async (req, res) => {
  let result = {};

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;
    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

    if (reqMac !== mac) {
      result.return_code = -1;
      result.return_message = "mac not equal";
      return res.json(result);
    }

    const dataJson = JSON.parse(dataStr);
    const { amount, embed_data } = dataJson;
    const embed = JSON.parse(embed_data);

    const booking = new Booking({
      user: embed.user,
      service: embed.service,
      date: embed.date,
      time: embed.time,
      address: embed.address,
      note: embed.note,
      selectedOptionType: embed.selectedOptionType,
      selectedPrice: embed.selectedPrice || amount,
      status: "pending",
      transactionId: embed.transactionId,
    });

    await booking.save();

    result.return_code = 1;
    result.return_message = "success";
  } catch (err) {
    result.return_code = 0;
    result.return_message = err.message;
  }

  return res.json(result);
};

const checkPayment = async (req, res) => {
  const { transId } = req.params;

  try {
    const booking = await Booking.findOne({ transactionId: transId })
      .populate("user", "name")
      .populate("service", "name");
    console.log(booking);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy giao dịch" });
    }

    return res.status(200).json({
      success: true,
      status: booking.status,
      bookingId: booking._id,
      amount: booking.selectedPrice,
      timestamp: booking.createdAt,
      userName: booking.user?.name || "N/A",
      serviceName: booking.service?.name || "N/A",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Lỗi máy chủ", error: err.message });
  }
};

module.exports = { payment, paymentCallBack, checkPayment };
