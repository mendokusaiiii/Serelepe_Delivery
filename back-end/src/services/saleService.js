const { Sale, SalesProduct, User } = require('../database/models');

const createSalesProdutcs = async (saleId, cart) => {
  const newSalesProducts = cart.map((item) => {
    const newRegister = SalesProduct.create({
      saleId,
      productId: item.id,
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

module.exports = {
  createSale,
  getAllSales,
};
