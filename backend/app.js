const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const routes = require("./src/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

//cors
app.use(cors({
  origin: 'http://localhost:5173', // Dirección de tu frontend
  methods: ['GET', 'POST'],       // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware
app.use(bodyParser.json());

// Rutas
app.use("/", routes());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido al chatbot de sushi!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running! http://localhost:${PORT}`);
});
