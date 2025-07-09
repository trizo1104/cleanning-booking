const express = require("express");
const servicesController = require("../controllers/service.controller");
const middleware = require("../middleware/auth.middleware");
const serviceRouter = express.Router();

serviceRouter.get(
  "/",
  // middleware.protectRoute,
  servicesController.getAllServices
);

serviceRouter.get(
  "/:id",
  // middleware.protectRoute,
  // middleware.userOnly,
  servicesController.getServiceDetail
);

serviceRouter.post(
  "/",
  middleware.protectRoute,
  middleware.adminOnly,
  servicesController.createService
);

serviceRouter.post(
  "/update-service/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  servicesController.updateService
);

serviceRouter.post(
  "/delete-service/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  servicesController.deleteService
);

module.exports = serviceRouter;
