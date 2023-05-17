const { Sale, SalesProduct, User, Product } = require('../database/models');

const createSalesProdutcs = async (saleId, cartItems) => {
  const newSalesProducts = cartItems.map((item) => {
    const newRegister = SalesProduct.create({
      saleId,
      productId: item.productId,
      quantity: item.quantity,
    });

    return newRegister;
  });
  await Promise.all(newSalesProducts);
};

const createSale = async (data) => {
  const { cartItems, totalPrice, sellerId, deliveryAddress, deliveryNumber, userEmail } = data;

  const getUser = await User.findOne({ where: { email: userEmail } });

  const newSale = await Sale.create({
    userId: getUser.id,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  
  await createSalesProdutcs(newSale.id, cartItems);

  return newSale.id;
};

const getAllSales = async () => Sale.findAll({
  attributes: [
   'id',
   'status',
   'saleDate', 
   'totalPrice', 
   'deliveryAddress'],
});

const updateSale = async (id, status) => {
  const result = await Sale.update({ status }, { where: { id } });
  return result;
};

const detailedSale = async (saleId) => {
  const saleDatails = await SalesProduct.findAll({
    where: { saleId },
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price'],
      },
      {
        model: Sale,
        as: 'sale',
        attributes: { exclude: ['id'] },
      },
    ],
  });
  return saleDatails;
};

const salesByRoleId = async (id, role) => {
  const saleDetails = await SalesProduct.findAll({
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price'],
      },
      {
        model: Sale,
        as: 'sale',
        where: { [role]: id },
        attributes: { exclude: ['id'] },
      },
    ],
  });
  return saleDetails;
};

module.exports = {
  createSale,
  getAllSales,
  updateSale,
  detailedSale,
  salesByRoleId,
};
