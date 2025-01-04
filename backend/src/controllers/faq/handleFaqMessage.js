const faqResponses = {
    "están abiertos": "¡Hola! Estamos abiertos de lunes a sábado de 12:00 PM a 10:00 PM. 😊",
    "tienen delivery": "¡Claro que sí! Ofrecemos servicio de delivery. 🚚🍣",
    "dónde están ubicados": "Estamos ubicados en el centro de la ciudad, en Calle Sushi 123. 🗺️",
    "cómo puedo pagar": "Aceptamos efectivo, tarjetas de débito y crédito. 💳",
  };
  
  const handleFaqMessage = async (req, res) => {
    const { message } = req.body;
  
    if (!message) {
      return res.status(400).json({ reply: "No entendí tu pregunta. Por favor, inténtalo de nuevo." });
    }
  
    const normalizedMessage = message.toLowerCase().trim();
    const reply = Object.keys(faqResponses).find((faq) =>
      normalizedMessage.includes(faq)
    );
  
    if (reply) {
      return res.json({ reply: faqResponses[reply] });
    }
  
    return res.json({
      reply: "Lo siento, no entendí tu pregunta. Por favor, inténtalo de nuevo o contáctanos para más información.",
    });
  };
  
  module.exports = handleFaqMessage;
  