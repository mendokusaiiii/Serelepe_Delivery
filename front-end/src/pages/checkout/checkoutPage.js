import React from 'react';
import Header from '../../components/Customer/Header';
import Checkout from '../../components/Customer/checkout';
import '../../styles/checkoutPage/checkout.css';

function CheckoutPage() {
  return (
    <html lang="en" className="checkoutPage">
      <Header />
      <Checkout />
    </html>
  );
}

export default CheckoutPage;
