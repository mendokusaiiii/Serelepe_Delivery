const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const getProducts = await productsService.getAllProducts();
  res.status(200).json(getProducts);
};

module.exports = {
  getAllProducts,
};
