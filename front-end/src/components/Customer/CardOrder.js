/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import fetchGetUserId from '../../api/fetchGetUserId';
import fetchSalesByRoleId from '../../api/fetchGetSalesByRoleId';
import { dateConverter } from '../../helpers/cartFunctions';
import stateGlobalContext from '../../context/stateGlobalContext';
import '../../styles/OrdersPage/ordersPage.css';
function CardOrder() {
  const [orders, setOrders] = useState([]);
  const { sellerStatus, setSellerStatus } = useContext(stateGlobalContext);
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

  const priceConverter = (currency) => {
    const brlCurrency = currency.toString().replace('.', ',');
    return `R$ ${brlCurrency}`;
  };

  const card = (ords) => {
    const { saleId } = ords;
    const { date } = ords;
    const { status } = ords;
    const total = ords.value;

    return (
      <tr key={ saleId }>
        <td>
          <Link to={ `/customer/orders/${saleId}` }>
            {addingZero(saleId)}
          </Link>
        </td>
        <td>{status}</td>
        <td>{date}</td>
        <td>{priceConverter(total)}</td>
      </tr>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readLocal('user');
        const userDatabase = await fetchGetUserId({ userEmail: user.email });
        const userId = userDatabase.data.userId.id;
        const { data } = await fetchSalesByRoleId(user.token, {
          id: userId,
          role: 'userId',
        });
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
            products: [],
          };
        }
        groupedOrders[item.saleId].products.push({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        });
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(groupedOrders).map((order) => {
              const total = order.products.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
              );
              setSellerStatus(sellerStatus, {
                saleId: order.id,
                value: total.toFixed(2),
                date: dateConverter(order.saleDate),
                status: order.status,
              });

              return card({
                saleId: order.id,
                value: total.toFixed(2),
                date: dateConverter(order.saleDate),
                status: order.status,
              });
            })}
          </tbody>
        </table>
      );
    }
  };

  return <div className='shopping-cart-table'>{renderingCardOrders()}</div>;
}

export default CardOrder;
