const { Product } = require("../../models/orderModel");

const createProduct = async (req, res) => {
    try {
      const { name, stock } = req.body;
  
      if (!name || !stock) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
      }
  
      // Buscar si ya existe un producto con el mismo nombre
      const existingProduct = await Product.findOne({ name });
  
      if (existingProduct) {
        // Actualizar el stock sumando el nuevo valor
        existingProduct.stock += stock;
        await existingProduct.save();
  
        return res.status(200).json({
          message: 'Stock actualizado con éxito',
          product: existingProduct,
        });
      }
  
      // Crear un nuevo producto si no existe
      const newProduct = new Product({ name, stock });
      await newProduct.save();
  
      return res.status(201).json({
        message: 'Producto agregado con éxito',
        product: newProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor.' });
    }
  };

module.exports = createProduct;
