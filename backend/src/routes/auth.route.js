const express = require("express");
const authController = require("../controllers/auth.controller");
const middleware = require("../middleware/auth.middleware");
const authRoute = express.Router();

authRoute.post("/signup", authController.signUp);
authRoute.post("/signin", authController.signIn);
authRoute.post("/signout", authController.signOut);
authRoute.get("/me", middleware.protectRoute, authController.auth);

module.exports = authRoute;
