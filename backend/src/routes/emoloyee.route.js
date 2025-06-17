const express = require("express");
const employeeController = require("../controllers/employee.controller");
const middleware = require("../middleware/auth.middleware");
const employeeRouter = express.Router();

employeeRouter.get(
  "/",
  middleware.protectRoute,
  middleware.adminOnly,
  employeeController.getEmployees
);

module.exports = employeeRouter;
