const { Router } = require("express");
const {getMenuController}  = require("../controllers/menuController");
const menuRoutes = Router();
menuRoutes.get('/', getMenuController);
module.exports = menuRoutes;;