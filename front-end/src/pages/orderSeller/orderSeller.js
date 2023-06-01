import React from 'react';
import HeaderSeller from '../../components/Seller/HeaderSeller';
import OrderSeller from '../../components/Seller/OrderSeller';
import '../../styles/cardDetailsPage/cardDetails.css';

function OrderSellerPage() {
  return (
    <div className="checkoutPage">
      <HeaderSeller />
      <OrderSeller />
    </div>
  );
}

export default OrderSellerPage;
