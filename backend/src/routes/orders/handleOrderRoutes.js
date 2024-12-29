const { Router } = require("express");
const handleOrderMessage = require("../../controllers/orders/handleOrderMessage");

const handleOrderRoutes = Router();

handleOrderRoutes.post("/orders/message", handleOrderMessage);

module.exports = handleOrderRoutes;
