const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path'); // Asegúrate de tener esto importado
const mongoose = require("mongoose");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, 'public'))); // Esto hace que los archivos en la carpeta public sean accesibles

//cors
app.use(cors({
  origin: 'http://localhost:5173', // Dirección de tu frontend
  methods: ['GET', 'POST'],       // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware
app.use(bodyParser.json());
app.use(express.json());


// Rutas
app.use("/api", routes());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido al chatbot de sushi!");
});

//MongoDB conexion

mongoose.connect("mongodb://localhost:27017/sushiBotDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((error) => console.error("Error al conectar a MongoDB:", error));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running! http://localhost:${PORT}`);
});
