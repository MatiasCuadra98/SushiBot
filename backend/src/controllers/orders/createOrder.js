const { Product, Order } = require("../../models/orderModel");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const { product, quantity } = req.body;
  console.log("Datos recibidos:", req.body); // Verifica los datos enviados

  try {
    let existingProduct;

    // Si el campo product es un ObjectId (en formato de cadena), buscar por ID
    if (mongoose.Types.ObjectId.isValid(product)) {
      existingProduct = await Product.findById(product);
    } else {
      // Si no es un ObjectId, buscar por el nombre del producto
      existingProduct = await Product.findOne({ name: product });
    }

    console.log("Producto encontrado:", existingProduct); // Muestra el producto encontrado

    if (!existingProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar si hay stock suficiente
    if (existingProduct.stock < quantity) {
      return res.status(400).json({
        message: `Lo siento, solo tenemos ${existingProduct.stock} unidades de ${existingProduct.name} disponibles.`,
      });
    }

    // Crear la orden
    const order = new Order({
      product: existingProduct._id,
      quantity,
    });
    await order.save();
    console.log("Orden creada:", order); // Muestra la orden creada

    // Descontar el stock del producto
    existingProduct.stock -= quantity;
    await existingProduct.save();
    console.log("Stock actualizado:", existingProduct.stock); // Muestra el nuevo stock

    res.json({
      message: "Orden creada con éxito",
      order,
    });
  } catch (error) {
    console.error("Error al crear la orden:", error); // Muestra errores en consola
    res.status(500).json({ message: "Error al crear la orden", error });
  }
};

module.exports = createOrder;
