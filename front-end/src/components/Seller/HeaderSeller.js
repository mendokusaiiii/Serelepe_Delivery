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
        className="header-link"
        to="/seller/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Orders
      </Link>
      <p className="header-user-seller">
        {user.name}
      </p>

      <Link
        className="logoutLink"
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
