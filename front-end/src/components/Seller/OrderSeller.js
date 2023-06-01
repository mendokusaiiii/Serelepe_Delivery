import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import fetchSalesByRoleId from '../../api/fetchGetSalesByRoleId';
import fetchGetUserId from '../../api/fetchGetUserId';

function OrderSeller() {
  const [orders, setOrders] = useState([]);

  const addingZero = (num) => {
    let zeroPlusNumber = String(num);
    let counter = zeroPlusNumber.length;
    const maxLength = 4;

    while (counter < maxLength) {
      zeroPlusNumber = `0${zeroPlusNumber}`;
      counter += 1;
    }
    return zeroPlusNumber;
  };

  const dateConverter = (d) => {
    const currentDate = new Date(d);
    const sliceNumber = -2;
    const day = (`0${currentDate.getDate()}`).slice(sliceNumber);
    const month = (`0${currentDate.getMonth() + 1}`).slice(sliceNumber);
    const result = `${day}/${month}/${currentDate.getFullYear()}`;
    return result;
  };

  const priceConverter = (currency) => {
    const brlCurrency = currency.toString().replace('.', ',');
    return `R$ ${brlCurrency}`;
  };

  const dataTestId = 'seller_orders__element-order-id-';
  const dataTestIdStatus = 'seller_orders__element-delivery-status-';
  const dataTestIdDate = 'seller_orders__element-order-date-';
  const dataTestIdPrice = 'seller_orders__element-card-price-';
  const dataTestIdAddress = 'seller_orders__element-card-address-';

  const card = (ords) => {
    const { saleId, status, deliveryAddress } = ords;
    const { date } = ords;
    const total = ords.value;
    return (
      <tr key={ saleId }>
        <td>
          <Link
            to={ `/seller/orders/${saleId}` }
            data-testid={ `${dataTestId}-${saleId}` }
          >
            {addingZero(saleId)}
          </Link>
        </td>
        <td data-testid={ `${dataTestIdStatus}-${saleId}` }>
          {status}
        </td>
        <td>
          <span data-testid={ `${dataTestIdDate}-${saleId}` }>
            {dateConverter(date)}
          </span>
        </td>
        <td data-tesid={ `${dataTestIdPrice}-${saleId}` }>
          {priceConverter(total)}
        </td>
        <td data-testid={ `${dataTestIdAddress}-${saleId}` }>
          {deliveryAddress}
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readLocal('user');
        const sellerDatabase = await fetchGetUserId({ userEmail: user.email });
        const sellerId = sellerDatabase.data.userId.id;
        const { data } = await fetchSalesByRoleId(user.token, {
          id: sellerId, role: 'sellerId' });
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const renderingCardOrders = () => {
    if (Array.isArray(orders) && orders.length !== 0) {
      const groupedOrders = {};
      orders.forEach((item) => {
        if (!groupedOrders[item.saleId]) {
          groupedOrders[item.saleId] = {
            id: item.saleId,
            status: item.sale.status,
            saleDate: item.sale.saleDate,
            total: item.sale.totalPrice,
            deliveryAddress: item.sale.deliveryAddress,
            products: [],
          };
        }
        groupedOrders[item.saleId].products.push({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          deliveryAddress: item.sale.deliveryAddress,
        });
      });

      return (
        <div className="shopping-cart-table">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(groupedOrders).map((order) => {
                const total = order.products.reduce((
                  acc,
                  product,
                ) => acc + product.price * product.quantity, 0);
                return card({
                  saleId: order.id,
                  value: total.toFixed(2),
                  date: new Date(order.saleDate).toLocaleDateString(),
                  status: order.status,
                  deliveryAddress: order.deliveryAddress,
                });
              })}
            </tbody>
          </table>
        </div>

      );
    }
  };

  return <div>{renderingCardOrders()}</div>;
}

export default OrderSeller;
