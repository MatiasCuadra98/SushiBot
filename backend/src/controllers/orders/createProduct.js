const { Product } = require("../../models/orderModel");

const createProduct = async (req, res) => {
    const { name, stock } = req.body;

    try {
        // Buscar si ya existe un producto con el mismo nombre
        const existingProduct = await Product.findOne({ name }); // Corregimos aquí

        if (existingProduct) {
            // Si existe, actualizar el stock sumando el nuevo valor
            existingProduct.stock += stock;
            await existingProduct.save();

            return res.json({
                message: "Producto actualizado con éxito",
                product: existingProduct,
            });
        }

        // Si no existe, crear un nuevo producto
        const product = new Product({ name, stock });
        await product.save();

        res.json({ message: "Producto agregado con éxito", product });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar o actualizar el producto", error });
    }
};

module.exports = createProduct;
