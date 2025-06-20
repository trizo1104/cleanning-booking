const express = require("express");
const employeeController = require("../controllers/employee.controller");
const middleware = require("../middleware/auth.middleware");
const employeeRouter = express.Router();

employeeRouter.get(
  "/allEmployee",
  middleware.protectRoute,
  middleware.adminOnly,
  employeeController.getAllEmployees
);

employeeRouter.get(
  "/bookings",
  middleware.protectRoute,
  middleware.employeeOnly,
  employeeController.getAssignedBookings
);

employeeRouter.post(
  "/bookings/:id/status",
  middleware.protectRoute,
  middleware.employeeOnly,
  employeeController.updateBookingStatus
);
employeeRouter.post(
  "/bookings/:id/note",
  middleware.protectRoute,
  middleware.employeeOnly,
  employeeController.addStaffNote
);
employeeRouter.get(
  "/bookings/date",
  middleware.protectRoute,
  employeeController.getBookingsByDate
);

module.exports = employeeRouter;
