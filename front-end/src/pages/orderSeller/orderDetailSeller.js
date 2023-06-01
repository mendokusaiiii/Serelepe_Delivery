import React from 'react';
import HeaderSeller from '../../components/Seller/HeaderSeller';
import CardDetailSeller from '../../components/Seller/CardDetailSeller';
import '../../styles/cardDetailsPage/cardDetails.css';

function OrderDetailSeller() {
  return (
    <html lang="en" className="checkoutPage">
      <HeaderSeller />
      <CardDetailSeller />
    </html>
  );
}

export default OrderDetailSeller;
