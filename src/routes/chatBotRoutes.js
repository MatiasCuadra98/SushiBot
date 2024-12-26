const { Router } = require("express");
const {chatBotController}  = require("../controllers/chatBotController");
const chatBotRoutes = Router();
chatBotRoutes.get('/', chatBotController);
module.exports = chatBotRoutes;;