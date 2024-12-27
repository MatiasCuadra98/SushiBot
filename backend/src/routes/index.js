const { Router } = require("express");
const menuRoutes = require("./menuRoutes");
const chatRoutes = require("./chatRoutes");

const routes = Router();

module.exports = () => {
  routes.use("/menu", menuRoutes);
  routes.use("/chat", chatRoutes);



  return routes;
};
