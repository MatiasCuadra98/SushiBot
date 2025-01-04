const { Router } = require("express");
const handleFaqMessage = require("../../controllers/faq/handleFaqMessage");

const faqRoutes = Router();

faqRoutes.post("/message", handleFaqMessage);

module.exports = faqRoutes;
