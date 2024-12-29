const { Product, Order } = require("../../models/orderModel");

const handleOrderMessage = async (req, res) => {
  const { message } = req.body;

  // Analizar el mensaje para extraer la cantidad y el nombre del producto
  const match = message.match(/(\d+)\s*piezas\s*de\s*([\w\s]+)/i);

  if (!match) {
    return res.json({
      reply: "No entendí bien tu solicitud. ¿Puedes especificar el número de piezas y el tipo de producto?",
    });
  }

  const quantity = parseInt(match[1]);
  const productName = match[2].toLowerCase();

  try {
    // Buscar el producto en la base de datos
    const product = await Product.findOne({
      name: { $regex: new RegExp(productName, "i") },
    });

    if (!product) {
      return res.status(404).json({
        reply: `Lo siento, no tenemos ${productName} disponible.`,
      });
    }

    // Verificar el stock
    if (product.stock < quantity) {
      return res.json({
        reply: `Lo siento, solo tenemos ${product.stock} piezas de ${productName} disponibles.`,
      });
    }

    // Crear el pedido
    const order = new Order({
      product: product._id,
      quantity,
    });
    await order.save();

    // Actualizar el stock
    product.stock -= quantity;
    await product.save();

    return res.json({
      reply: `¡Perfecto! Se han registrado ${quantity} piezas de ${productName}. ¡Disfruta tu sushi! 🎉`,
    });
  } catch (error) {
    console.error("Error procesando el pedido:", error);
    return res.status(500).json({
      reply: "Hubo un error al procesar tu pedido. Intenta nuevamente.",
    });
  }
};

module.exports = handleOrderMessage;
