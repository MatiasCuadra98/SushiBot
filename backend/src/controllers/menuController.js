const path = require('path');

// Controlador para enviar el menú
const getMenuController = (req, res) => {
    const menuPath = path.join(__dirname, '../../public/menu-sushi.pdf');
    res.sendFile(menuPath);
};

module.exports = { getMenuController };
