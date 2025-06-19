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

bookingRoute.put(
  "/:id/assign",
  middleware.protectRoute,
  middleware.adminOnly,
  bookingController.assignEmployee
);

bookingRoute.get(
  "/employee/today",
  middleware.protectRoute,
  middleware.employeeOnly,
  bookingController.getTodayBookingsForEmployee
);

bookingRoute.put(
  "/:id/complete",
  middleware.protectRoute,
  middleware.employeeOnly,
  bookingController.markBookingCompleted
);

bookingRoute.post(
  "/:id/review",
  middleware.protectRoute,
  bookingController.reviewBooking
);

bookingRoute.get("/service/:serviceId", bookingController.getReviewsByService);

module.exports = bookingRoute;
