const saleService = require('../services/saleService');

const createSale = async (req, res, next) => {
  try {
    const saleId = await saleService.createSale(req.body);
    return res.status(201).json({ saleId });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (_req, res) => {
  const result = await saleService.getAllSales();
  res.status(200).json(result);
};

module.exports = {
  createSale,
  getAllSales,
};
