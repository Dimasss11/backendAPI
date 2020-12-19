const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const middleware=require("../middlewares/authToken.js");

userRouter.get("/me", middleware.authenticateToken, userController.me);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);


module.exports = userRouter;
