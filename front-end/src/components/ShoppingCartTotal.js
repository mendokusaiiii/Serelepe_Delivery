import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import stateGlobalContext from '../context/stateGlobalContext';
import { readLocal } from '../helpers/localStorage';
import { sumItems } from '../helpers/cartFunctions';

function ShoppingCartTotal() {
  const { myArray, setMyArray } = useContext(stateGlobalContext);
  const [total, setTotal] = useState('0.0');
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const localCart = readLocal('cartValue');

  useEffect(() => {
    if (myArray.length > 0) {
      setTotal(readLocal('cartValue'));
      console.log(readLocal('cartValue'));
      setDisabled(false);
    } else {
      setTotal('0.0');
      setDisabled(true);
    }
  }, [myArray]);

  useEffect(() => {
    if (readLocal('cartValue')) {
      setTotal(readLocal('cartValue'));
    }
  }, [localCart]);

  return (
    <div>
      <button
        data-testid="customer_products__button-cart"
        type="submit"
        disabled={ disabled }
        onClick={ () => {
          setMyArray(sumItems(myArray));
          history.push('/customer/checkout');
        } }
      >
        total shopping cart: R$
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {/* { `${total.replace('.', ',')}` } */}
          {total.replace('.', ',')}
        </span>
      </button>
    </div>
  );
}

export default ShoppingCartTotal;
