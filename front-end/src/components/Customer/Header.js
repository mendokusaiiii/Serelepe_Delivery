import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearLocal, readLocal } from '../../helpers/localStorage';
import '../../styles/components/header.css';

function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const deliveryApp = readLocal('user');
    setUser(deliveryApp);
  }, []);

  return (

    <div className="classHeader">
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
        className="header-link"
      >
        Products
      </Link>

      <Link
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
        className="header-link"
      >
        Orders
      </Link>

      <p className="header-user-seller">{user.name}</p>

      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => clearLocal() }
        className="header-link"
      >
        Logout
      </Link>
    </div>

  );
}

export default Header;
