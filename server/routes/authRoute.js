const express = require("express");
const {
  loginUserController,
  registerUserController,
  logoutController,
} = require("../controllers/userControllers");
const authRouter = express.Router();

authRouter.post("/register", registerUserController);
authRouter.post("/login", loginUserController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;
