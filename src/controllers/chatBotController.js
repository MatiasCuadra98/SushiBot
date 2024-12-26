const { generateResponse } = require('../services/openAiService');

// Controlador para manejar el chat
const chatBotController = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await generateResponse(message);
        res.json({ response });
    } catch (error) {
        console.error('Error in chat controller:', error);
        res.status(500).json({ error: 'Error processing the message.' });
    }
};

module.exports = { chatBotController };
