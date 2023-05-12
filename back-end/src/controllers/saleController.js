const saleService = require('../services/saleService');

const createSale = async (req, res, next) => {
  try {
    const saleId = await saleService.createSale(req.body);
    return res.status(201).json({ saleId });
  } catch (error) {
    next(error);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const result = await saleService.getAllSales();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { saleId, status } = req.body;
    const result = await saleService.updateSale(saleId, status);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const detailedSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await saleService.detailedSale(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSale,
  getAllSales,
  updateSale,
  detailedSale,
};
