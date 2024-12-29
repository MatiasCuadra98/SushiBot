const { Router } = require("express");
const chatRoutes = require("./chatRoutes");
const orderRoutes = require("../routes/orders/orderRoutes");
const handleOrderRoutes = require("../routes/orders/handleOrderRoutes");

const routes = Router();

module.exports = () => {
  routes.use("/chat", chatRoutes);
  routes.use("/", orderRoutes);
  routes.use("/", handleOrderRoutes);

  return routes;
};
