import React, { useState, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import RegisterPage from './pages/register/register';
import ProductsPage from './pages/products/products';
import CheckoutPage from './pages/checkout/checkoutPage';
import OrdersPage from './pages/ordersCostumer/orders';
import OrderDetails from './pages/ordersCostumer/orderDetails';
import stateGlobalContext from './context/stateGlobalContext';
import OrderDetailSeller from './pages/orderSeller/orderDetailSeller';
import OrderSeller from './pages/orderSeller/orderSeller';
import Admin from './pages/admin/admin';

function App() {
  const [myArray, setMyArray] = useState([]);
  const [sellerStatus, setSellerStatus] = useState([]);

  const stateValue = useMemo(() => ({ myArray,
    setMyArray,
    sellerStatus,
    setSellerStatus }), [
    myArray,
    setMyArray,
    sellerStatus,
    setSellerStatus,
  ]);

  return (
    <stateGlobalContext.Provider value={ stateValue }>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/customer/orders/" component={ OrdersPage } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/seller/orders/" component={ OrderSeller } />
        <Route exact path="/seller/orders/:id" component={ OrderDetailSeller } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/admin/manage" component={ Admin } />
      </Switch>
    </stateGlobalContext.Provider>
  );
}

export default App;
