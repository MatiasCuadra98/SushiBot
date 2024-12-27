const path = require('path');

// Controlador para manejar los mensajes
const handleMessage = (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    // Si el cliente pide el menú
    if (message.toLowerCase().includes('menu')) {
        const menuPath = path.join(__dirname, '../../public/menu-sushi.pdf');
        return res.sendFile(menuPath);
    }

    // Respuesta genérica
    return res.status(200).json({ reply: 'Lo siento, no entiendo tu mensaje.' });
};

module.exports = { handleMessage };
