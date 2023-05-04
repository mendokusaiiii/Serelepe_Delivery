import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import stateGlobalContext from '../context/stateGlobalContext';

function Card({ product }) {
  const { name, urlImage, id, price } = product;
  const { addAndRemoveTotal } = useContext(stateGlobalContext);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    addAndRemoveTotal({ ...product, counter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  function increment() {
    setCounter(counter + 1);
  }
  function decrement() {
    if (counter <= 0) return 0;
    setCounter(counter - 1);
  }
  function handleChange(event) {
    if (Number(event.target.value) >= 0) {
      setCounter(Number(event.target.value));
    }
  }

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
        { `R$ ${price.toString().replace('.', ',')}` }
      </p>
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="submit"
        onClick={ increment }
      >
        +
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        type="number"
        onChange={ handleChange }
        min={ 0 }
        value={ Number(counter) }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="submit"
        onClick={ decrement }
      >
        -
      </button>
    </div>
  );
}
Card.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    urlImage: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Card;
