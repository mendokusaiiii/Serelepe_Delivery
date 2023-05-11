import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function Card({ name, urlImage, id, price, incrementOrDecrement,
  quantity, inputIncrementOrDecrement }) {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(quantity === 0);

  useEffect(() => {
    setCounter(quantity);
    setDisabled(quantity === 0);
  }, [quantity]);

  return (
    <div className="card-product">
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="50px"
      />
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { `${price.toString().replace('.', ',')}` }
      </p>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="submit"
        onClick={ () => {
          incrementOrDecrement({ id, name, price, quantity: 1 });
          setCounter(counter + 1);
        } }
      >
        +
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        min={ 0 }
        onChange={ (e) => {
          inputIncrementOrDecrement({ id, name, price, quantity: +e.target.value });
          setCounter(+e.target.value);
        } }
        value={ counter }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="submit"
        disabled={ disabled }
        onClick={ () => {
          incrementOrDecrement({ id, name, price, quantity: -1 });
          if (counter > 0) setCounter(counter - 1);
        } }
      >
        -
      </button>
    </div>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  incrementOrDecrement: PropTypes.func.isRequired,
  inputIncrementOrDecrement: PropTypes.func.isRequired,
  price: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,

};

export default Card;
