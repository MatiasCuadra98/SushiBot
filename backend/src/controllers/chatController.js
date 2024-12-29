// Controlador para manejar los mensajes
const handleMessage = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  // Si el cliente pide el menú
  if (message.toLowerCase().includes("menu") || message.toLowerCase().includes("menú")) {
    // Enviar el enlace del PDF en lugar de enviarlo directamente
    return res.status(200).json({
      reply: "Aquí tienes el menú: descarga el PDF.",
      pdfUrl: "http://localhost:3000/menu-sushi.pdf", // Enlace al PDF
    });
  }

  // Respuesta genérica
  return res.status(200).json({ reply: "Lo siento, no entiendo tu mensaje." });
};

module.exports = { handleMessage };
