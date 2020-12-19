const express = require("express");
const itemController = require("../controllers/itemController.js");
const itemsRouter = express.Router();
const authToken=require("../middlewares/authToken.js");
const valid=require("../middlewares/valid.js");
const {uploadImg}=require("../middlewares/upload.js")

itemsRouter.get("/", itemController.getListItems);
itemsRouter.get("/:productId", itemController.getItemById);
itemsRouter.put("/:productId", authToken.authenticateToken, valid.validOwnItem, itemController.updateItemById);
itemsRouter.delete("/:productId", authToken.authenticateToken, valid.validOwnItem, itemController.deleteItemById);
itemsRouter.post("/", authToken.authenticateToken, itemController.createItem);

itemsRouter.post("/:productId/images", 
  authToken.authenticateToken, 
  valid.headerContent, 
  valid.validOwnItem,
  uploadImg,
  itemController.uploadImg
);

module.exports = itemsRouter;

