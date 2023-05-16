import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clearLocal, readLocal } from '../../helpers/localStorage';

function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const deliveryApp = readLocal('user');
    setUser(deliveryApp);
  }, []);

  return (
    <div>
      <br />
      <br />
      <Link
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Orders
      </Link>
      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        <h3>{ `User: ${user.name}` }</h3>
      </div>
      <Link
        to="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => clearLocal() }
      >
        Logout
      </Link>
    </div>
  );
}

export default Header;
