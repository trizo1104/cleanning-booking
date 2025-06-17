const express = require("express");
const authController = require("../controllers/auth.controller");
const authRoute = express.Router();

authRoute.post("/signup", authController.signUp);
authRoute.post("/signin", authController.signIn);
authRoute.post("/signout", authController.signOut);

module.exports = authRoute;
