const express = require("express");
const paymentController = require("../controllers/payment.controller");
const middleware = require("../middleware/auth.middleware");
const paymentZalo = express.Router();

paymentZalo.post(
  "/pay-booking",
  middleware.protectRoute,
  paymentController.payment
);
paymentZalo.post(`/callback`, paymentController.paymentCallBack);

paymentZalo.get(
  "/check-payment-status/:transId",
  paymentController.checkPayment
);

module.exports = paymentZalo;
