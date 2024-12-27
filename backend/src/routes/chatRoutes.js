const { Router } = require("express");

const { handleMessage } = require('../controllers/chatController');
const chatRoutes = Router();

// Ruta para manejar mensajes
chatRoutes.post('/', handleMessage);

module.exports = chatRoutes;
