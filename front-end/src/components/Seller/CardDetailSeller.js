import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchCardDetails from '../../api/fetchCardDetail';
import { readLocal } from '../../helpers/localStorage';
import fetchSalesUpdatingStatus from '../../api/fetchSalesUpdatingStatus';

function OrderDetailSeller() {
  const params = useParams();
  const [date, setDate] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, setOrder] = useState([]);
  // const [disabledPreparative, setDisabledPreparative] = useState(false);
  // const [disabledDelivery, setDisabledDelivery] = useState(true);
  const [status, setStatus] = useState('');

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

  // const disabledButton = (status) => {
  //   if (status === 'Preparando') {
  //     setDisabledPreparative(false);
  //     return setDisabledDelivery(true);
  //   }
  //   setDisabledPreparative(true);
  //   setDisabledDelivery(true);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const user = readLocal('user');
      const { data } = await fetchCardDetails(user.token, params.id);

      setOrder(data);
      // disabledButton(data[0].sale.status);
      setTotalPrice(data[0].sale.totalPrice);
      setStatus(data[0].sale.status);
      setDate(data[0].sale.saleDate);
    };
    fetchData();
  }, [params.id]);

  const preparingDelivery = async () => {
    setLoading(true);
    setDisabledPreparative(true);
    setDisabledDelivery(false);
    const user = readLocal('user');
    await fetchSalesUpdatingStatus(user.token, params.id, { status: 'Preparando' });
  };

  const outToDelivery = async () => {
    setLoading(true);
    setDisabledDelivery(true);
    const user = readLocal('user');
    await fetchSalesUpdatingStatus(user.token, params.id, { status: 'Em trânsito' });
    setLoading(false);
  };

  return (
    <>
      <h3>Order Details</h3>
      <p data-testid="seller_order_details__element-order-details-label-order-id">
        Order:
        {' '}
        { addingZero(params.id) }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        Date:
        {' '}
        { dateConverter(date) }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        Status:
        {' '}
        { status }
      </p>
      <button
        data-testid="seller_order_details__button-preparing-check"
        disabled={ false }
        onClick={ preparingDelivery }
        type="button"
      >
        Order Preparative
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        disabled
        onClick={ outToDelivery }
        type="button"
      >
        Out to Delivery
      </button>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
          {order && order.map((product, i) => {
            const item = `seller_order_details__element-order-table-item-number-${i}`;
            const description = `seller_order_details__element-order-table-name-${i}`;
            const quantity = `seller_order_details__element-order-table-quantity-${i}`;
            const unitPrice = `seller_order_details__element-order-table-unit-price-${i}`;
            const total = `seller_order_details__element-order-table-sub-total-${i}`;
            return (
              <tr key={ product.id }>
                <td data-testid={ item }>{ i + 1 }</td>
                <td data-testid={ description }>{ product.name }</td>
                <td data-testid={ quantity }>{ product.quantity }</td>
                <td data-testid={ unitPrice }>
                  { `${priceConverter(product.product.price)}` }
                </td>
                <td data-testid={ total }>
                  { `${priceConverter((+product.quantity
                     * +product.product.price).toFixed(2))}` }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>
        Total:
        {' '}
        <span
          data-testid="seller_order_details__element-order-total-price"
        >
          { `${priceConverter(totalPrice)}` }
        </span>
      </h1>
    </>
  );
}

export default OrderDetailSeller;
