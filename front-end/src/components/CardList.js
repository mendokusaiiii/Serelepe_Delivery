import React, { useEffect, useState } from 'react';
import fetchProduct from '../api/fetchProducts';
import Card from './Card';

function CardList() {
  const [productsList, setProductList] = useState([]);

  useEffect(() => {
    const gettingProducts = async () => {
      const productList = await fetchProduct();
      setProductList(productList.data);
    };
    gettingProducts();
  }, []);

  return (
    <>
      <h1>Cards</h1>
      <div className="card-list">
        {
          productsList.map((prod, index) => (
            <div key={ index }>
              <Card product={ prod } />
            </div>
          ))
        }
      </div>
    </>
  );
}

export default CardList;
