import React, { useState, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import RegisterPage from './pages/register/register';
import ProductsPage from './pages/products/products';
import CheckoutPage from './pages/checkout/checkout';
import stateGlobalContext from './context/stateGlobalContext';

function App() {
  const [myArray, setMyArray] = useState([]);
  const stateValue = useMemo(() => ({ myArray, setMyArray }), [myArray, setMyArray]);
  return (
    <stateGlobalContext.Provider value={ stateValue }>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/register" component={ RegisterPage } />
      </Switch>
    </stateGlobalContext.Provider>
  );
}

export default App;
