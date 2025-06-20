const express = require("express");
const bookingController = require("../controllers/booking.controller");
const middleware = require("../middleware/auth.middleware");
const bookingRoute = express.Router();

bookingRoute.post(
  "/",
  middleware.protectRoute,
  bookingController.createBooking
);

bookingRoute.get(
  "/my-bookings",
  middleware.protectRoute,
  bookingController.getMyBookings
);

bookingRoute.get(
  "/all",
  middleware.protectRoute,
  middleware.adminOnly,
  bookingController.getAllBookings
);

bookingRoute.get(
  "/allReviews",
  middleware.protectRoute,
  middleware.adminOnly,
  bookingController.getAllReviews
);

bookingRoute.post(
  "/:id/assign",
  middleware.protectRoute,
  middleware.adminOnly,
  bookingController.assignStaff
);

bookingRoute.post("cancel/:id", bookingController.cancelBooking);

bookingRoute.post("deletểview/:id", bookingController.deleteReview);

bookingRoute.post(
  "/:id/review",
  middleware.protectRoute,
  bookingController.reviewBooking
);

bookingRoute.get("/service/:serviceId", bookingController.getReviewsByService);

module.exports = bookingRoute;
