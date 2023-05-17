import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import fetchCardDetails from '../../api/fetchCardDetail';
import fetchSellers from '../../api/fetchSellers';
import fetchSalesUpdatingStatus from '../../api/fetchSalesUpdatingStatus';

function CardDetails() {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [seller, setSeller] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState('');
  const [disabled, setDisable] = useState(true);

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

  const dataTestidStatus = 'element-order-details-label-delivery-status';
  const dataTestidDate = 'customer_order_details__element-order-details-label-order-date';
  const saleTestid = 'customer_order_details__element-order-details-label-order-id';
  const totalPriceTestId = 'customer_order_details__element-order-total-price';

  const cardProducts = (obj, i) => {
    const { id, subTotal, name, unitPrice, quantity } = obj;
    return (
      <>
        <p data-testid={ `customer_order_details__element-order-table-item-number-${i}` }>
          {' '}
          ID :
          {id}
        </p>
        <p data-testid={ `customer_order_details__element-order-table-name-${i}` }>
          Nome :
          {' '}
          {name}
        </p>
        <p data-testid={ `customer_order_details__element-order-table-quantity-${i}` }>
          Quantidade :
          {' '}
          {quantity}
        </p>
        <p data-testid={ `customer_order_details__element-order-table-unit-price-${i}` }>
          Unit price:
          {' '}
          {priceConverter(unitPrice)}
        </p>
        <p data-testid={ `customer_order_details__element-order-table-sub-total-${i}` }>
          SubTotal:
          {priceConverter(subTotal)}
        </p>
      </>

    );
  };

  const fetchStatus = async () => {
    const user = readLocal('user');
    const { data } = await fetchCardDetails(user.token, params.id);
    setStatus(data[0].sale.status);
    await fetchSalesUpdatingStatus(user.token, params.id, { status: 'Entregue' });
    setStatus('Preparando');
    setOrders(data);
    setDisable(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = readLocal('user');
      const { data } = await fetchCardDetails(user.token, params.id);
      const allSellers = await fetchSellers();
      setOrders(data);
      if (data.length > 0) {
        setTotalPrice(priceConverter(data[0].sale.totalPrice));
        setStatus(data[0].sale.status);
        if (data[0].sale.status === 'Em Trânsito') {
          setDisable(false);
        }
        setDate(dateConverter(data[0].sale.saleDate));
        setSeller(allSellers.find((s) => s.id === data[0].sale.sellerId).name);
      }
    };

    fetchData();
  }, [params.id, status]);

  const renderingProducts = () => {
    if (orders.length !== 0 || orders !== undefined) {
      return (
        orders.map((item, i) => {
          const obj = {
            id: item.productId,
            name: item.product.name,
            unitPrice: item.product.price,
            quantity: item.quantity,
            subTotal: (item.product.price * item.quantity).toFixed(2),
          };
          return <div key={ item.id }>{ cardProducts(obj, i)}</div>;
        })
      );
    }
  };

  return (
    <>
      <div>
        <h1 data-testid={ saleTestid }>
          Order:
          {' '}
          {addingZero(params.id)}
        </h1>
        <h1
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Seller:
          {' '}
          {seller}
        </h1>
        <h1 data-testid={ dataTestidDate }>
          SaleDate:
          {' '}
          {date}
        </h1>
        <h1 data-testid={ `customer_order_details__${dataTestidStatus}` }>
          {status}
        </h1>
        <h1 data-testid={ totalPriceTestId }>
          Total Price:
          {totalPrice}
        </h1>
        <button
          onClick={ fetchStatus }
          type="button"
          disabled={ disabled }
          data-testid="customer_order_details__button-delivery-check"
        >
          Change to Delivered

        </button>
      </div>

      { renderingProducts() }
    </>
  );
}

export default CardDetails;
