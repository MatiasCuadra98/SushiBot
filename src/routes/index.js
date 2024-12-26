const { Router } = require("express");
const chatBotRoutes = require("./chatBotRoutes");
const menuRoutes = require("./menuRoutes");

const routes = Router();

module.exports = () => {
  routes.use("/chatbot", chatBotRoutes);
  routes.use("/menu", menuRoutes);


  return routes;
};
