import React from 'react';
import Header from '../../components/Customer/Header';
import CardOrder from '../../components/Customer/CardOrder';
import '../../styles/cardDetailsPage/cardDetails.css';

function OrdersCostumerPage() {
  return (
    <div className="checkoutPage">
      <Header />
      <CardOrder />
    </div>
  );
}

export default OrdersCostumerPage;
