const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/routes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', routes);

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido al chatbot de sushi!');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running! http://localhost:${PORT}`);
});
