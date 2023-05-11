const { Sale, SalesProduct, User } = require('../database/models');

const createSalesProdutcs = async (saleId, cart) => {
  const newSalesProducts = cart.map((item) => {
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
  const { cart, totalPrice, sellerId, deliveryAddress, deliveryNumber, userEmail } = data;

  const getUser = await User.findOne({ where: { email: userEmail } });

  const newSale = await Sale.create({
    userId: getUser.id,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  });
  
  await createSalesProdutcs(newSale.id, cart);

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

module.exports = {
  createSale,
  getAllSales,
  updateSale,
};
