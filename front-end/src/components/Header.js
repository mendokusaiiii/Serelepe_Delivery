import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clearLocal } from '../helpers/localStorage';

function Header() {
  const [user] = useState({});

  // useEffect(() => {
  //   const decode = async (key) => {
  //     const userInfo = await fetchToken(key);
  //     setUser(userInfo.data);
  //   };
  //   const deliveryApp = readLocal('user');
  //   decode(deliveryApp.token);
  // }, []);

  return (
    <div>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Products

      </Link>
      <br />
      <br />
      <Link
        to="customer/orders"
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
