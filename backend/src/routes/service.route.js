const express = require("express");
const servicesController = require("../controllers/service.controller");
const middleware = require("../middleware/auth.middleware");
const serviceRouter = express.Router();

serviceRouter.get("/", servicesController.getAllServices);
serviceRouter.get(
  "/:id",
  middleware.protectRoute,
  servicesController.getServiceDetail
);
serviceRouter.post(
  "/",
  middleware.protectRoute,
  middleware.adminOnly,
  servicesController.createService
);

module.exports = serviceRouter;
