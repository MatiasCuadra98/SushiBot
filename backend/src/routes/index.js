const { Router } = require("express");
const chatRoutes = require("./chatRoutes");

const routes = Router();

module.exports = () => {
  routes.use("/chat", chatRoutes);



  return routes;
};
