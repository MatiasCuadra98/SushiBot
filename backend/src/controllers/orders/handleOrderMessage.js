const { Product } = require("../../models/orderModel");

const handleOrderMessage = async (req, res) => {
  const { message, product, quantity } = req.body;

  // Si se proporciona `product` y `quantity`, construir el mensaje automáticamente
  let parsedMessage = message;
  if (!message && product && quantity) {
    parsedMessage = `${quantity} piezas de ${product}`;
  }

  // Validar que el mensaje esté definido
  if (!parsedMessage) {
    return res.status(400).json({
      reply: "El body debe incluir un campo 'message' o 'product' y 'quantity'.",
    });
  }

  console.log(parsedMessage); // Verifica que el mensaje esté llegando correctamente

  // Verificar si el mensaje contiene una solicitud de productos
  const match = parsedMessage.match(/(\d+)\s*piezas\s*de\s*([\w\s]+)/i);

  if (match) {
    const quantity = parseInt(match[1]);
    const productName = match[2].toLowerCase(); // Convertimos a minúsculas para hacer una búsqueda más flexible

    try {
      // Buscar el producto en la base de datos
      const product = await Product.findOne({
        name: { $regex: new RegExp(productName, "i") },
      });

      console.log(product); // Verifica el producto encontrado

      if (!product) {
        return res
          .status(404)
          .json({ reply: "Lo siento, no tenemos ese producto disponible." });
      }

      // Verificar si hay suficiente stock
      if (product.stock >= quantity) {
        // Si hay suficiente stock
        return res.json({
          reply: `¡Perfecto! Tenemos suficiente stock de ${productName}. Se prepararán ${quantity} piezas.`,
        });
      } else {
        // Si no hay suficiente stock
        return res.json({
          reply: `Lo siento, solo tenemos ${product.stock} piezas de ${productName} disponibles.`,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        reply: "Hubo un error al procesar tu pedido. Intenta nuevamente.",
      });
    }
  } else {
    return res.json({
      reply:
        "No entendí bien tu solicitud. ¿Puedes especificar el número de piezas y el tipo de producto?",
    });
  }
};

module.exports = handleOrderMessage;
