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
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await saleService.updateSale(id, status);
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

const salesByRoleId = async (req, res, next) => {
  try {
    const { id, role } = req.body;

    const result = await saleService.salesByRoleId(id, role);
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
  salesByRoleId,
};
