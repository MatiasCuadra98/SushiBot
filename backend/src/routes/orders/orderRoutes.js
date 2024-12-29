const { Router } = require("express");
const createOrder = require("../../controllers/orders/createOrder");
const listOrders = require("../../controllers/orders/listOrders");
const createProduct = require("../../controllers/orders/createProduct");

const orderRoutes = Router();

orderRoutes.post("/orders/create", createOrder);
orderRoutes.get("/orders/list", listOrders);
orderRoutes.post("/products/create", createProduct);

module.exports = orderRoutes;
