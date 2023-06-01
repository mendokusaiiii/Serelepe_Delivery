import React from 'react';
import Header from '../../components/Customer/Header';
import CardDetails from '../../components/Customer/CardDetails';
import '../../styles/cardDetailsPage/cardDetails.css';

function OrderDetails() {
  return (
    <div className="checkoutPage">
      <Header />
      <CardDetails />
    </div>
  );
}

export default OrderDetails;
