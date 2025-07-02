const express = require("express");
const authController = require("../controllers/auth.controller");
const middleware = require("../middleware/auth.middleware");
const authRoute = express.Router();

authRoute.get("/getalluser", authController.getAllUser);
authRoute.get("/getallemployee", authController.getAllEmployee);
authRoute.post("/signup", authController.signUp);
authRoute.post("/signup-employee", authController.signUpEmployee);
authRoute.post("/signin", authController.signIn);
authRoute.post("/signin-employee", authController.signInforEmployee);
authRoute.post("/signout", authController.signOut);
authRoute.get("/me", middleware.protectRoute, authController.auth);
authRoute.post(
  "/deleteUser/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  authController.deleteUser
);
authRoute.post(
  "/deleteEmployee/:id",
  middleware.protectRoute,
  middleware.adminOnly,
  authController.deleteEmployee
);

module.exports = authRoute;
