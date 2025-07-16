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
  const { amount, items, bookingId } = req.body;
  const transID = Math.floor(Math.random() * 1000000);
  const appTransId = `${moment().format("YYMMDD")}_${transID}`;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { transactionId: appTransId },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking không tồn tại" });
    }

    const embeddata = {
      redirecturl: `https://clean-hours.com/checking-payment`,
      // redirecturl: "http://localhost:3000/checking-payment",
      transactionId: appTransId,
      bookingId,
    };

    const order = {
      app_id: config.app_id,
      app_trans_id: appTransId,
      app_user: items[0].user,
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embeddata),
      amount,
      description: "ZaloPay Booking",
      bank_code: "",
      callback_url: `https://cleanning-booking.onrender.com/api/payment-zalo/callback`,
      // callback_url: `${process.env.NGROK_URL}/api/payment-zalo/callback`,
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
    const { embed_data } = dataJson;
    const embed = JSON.parse(embed_data);
    // const transactionId = embed.transactionId;

    const updatedBooking = await Booking.findByIdAndUpdate(
      embed.bookingId,
      { status: "paid" },
      { new: true }
    );

    if (!updatedBooking) {
      result.return_code = -2;
      result.return_message = "Booking not found";
      return res.json(result);
    }

    result.return_code = 1;
    result.return_message = "success";

    // result.return_code = 0;
    // result.return_message = "Payment not successful";
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
