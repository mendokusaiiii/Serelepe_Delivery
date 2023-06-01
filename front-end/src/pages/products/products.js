import React from 'react';
import Header from '../../components/Customer/Header';
import CardList from '../../components/Customer/CardList';
import ShoppingCartTotal from '../../components/Customer/ShoppingCartTotal';

function ProductsPage() {
  return (
    <>
      <Header />
      <CardList />
      <footer>
        <ShoppingCartTotal />
      </footer>

    </>
  );
}

export default ProductsPage;
