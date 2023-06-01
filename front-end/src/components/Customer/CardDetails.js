/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { readLocal } from "../../helpers/localStorage";
import fetchCardDetails from "../../api/fetchCardDetail";
import fetchSellers from "../../api/fetchSellers";
import fetchSalesUpdatingStatus from "../../api/fetchSalesUpdatingStatus";

function CardDetails() {
  const params = useParams();
  const [orders, setOrders] = useState([]);
  const [seller, setSeller] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState("");
  const [disabled, setDisable] = useState(true);

  const addingZero = num => {
    let zeroPlusNumber = String(num);
    let counter = zeroPlusNumber.length;
    const maxLength = 4;

    while (counter < maxLength) {
      zeroPlusNumber = `0${zeroPlusNumber}`;
      counter += 1;
    }

    return zeroPlusNumber;
  };

  const dateConverter = d => {
    const currentDate = new Date(d);
    const sliceNumber = -2;
    const day = `0${currentDate.getDate()}`.slice(sliceNumber);
    const month = `0${currentDate.getMonth() + 1}`.slice(sliceNumber);
    const result = `${day}/${month}/${currentDate.getFullYear()}`;
    return result;
  };

  const priceConverter = currency => {
    const brlCurrency = (+currency).toFixed(2).replace(".", ",");
    return `R$ ${brlCurrency}`;
  };

  const dataTestidStatus = "element-order-details-label-delivery-status";
  const dataTestidDate =
    "customer_order_details__element-order-details-label-order-date";
  const saleTestid =
    "customer_order_details__element-order-details-label-order-id";
  const totalPriceTestId = "customer_order_details__element-order-total-price";


  const fetchStatus = async () => {
    const user = readLocal("user");
    const { data } = await fetchCardDetails(user.token, params.id);
    setStatus(data[0].sale.status);
    await fetchSalesUpdatingStatus(user.token, params.id, {
      status: "Entregue"
    });
    setStatus("Preparando");
    setOrders(data);
    setDisable(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readLocal("user");
        const { data } = await fetchCardDetails(user.token, params.id);
        const allSellers = await fetchSellers();
        setOrders(data);
        if (data.length > 0) {
          setTotalPrice(priceConverter(data[0].sale.totalPrice));
          setStatus(data[0].sale.status);
          if (data[0].sale.status === "Em Trânsito") {
            setDisable(false);
          }
          setDate(dateConverter(data[0].sale.saleDate));
          setSeller(allSellers.find(s => s.id === data[0].sale.sellerId).name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params.id, status]);

  return (
    <div className="shopping-cart-table">
      <h1 data-testid={saleTestid}>Order N° {addingZero(params.id)}</h1>
      {orders.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr key={item.product.name}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{priceConverter(item.product.price)}</td>
                <td>{priceConverter(item.product.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <h1 data-testid="customer_order_details__element-order-details-label-seller-name">
          Seller: {seller}
        </h1>
        <h1 data-testid={dataTestidDate}>Date: {date}</h1>
        <h1 data-testid={`customer_order_details__${dataTestidStatus}`}>
          Status: {status}
        </h1>
        <h1 data-testid={totalPriceTestId}>Total Price: {totalPrice}</h1>
        <Button
              style={ {
                backgroundColor:disabled ?'grey': '#dd571c',
                padding: '20px',
                margin: '5px auto',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
              } }
          onClick={fetchStatus}
          type="button"
          disabled={disabled}
          data-testid="customer_order_details__button-delivery-check"
        >
          Change to Delivered
        </Button>
      </div>
    </div>
  );
}

export default CardDetails;
