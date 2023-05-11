import React from 'react';
import Header from '../../components/Header';
import CardList from '../../components/CardList';
import ShoppingCartTotal from '../../components/ShoppingCartTotal';

function ProductsPage() {
  return (
    <>
      <Header />
      <CardList />
      <ShoppingCartTotal />
    </>
  );
}

export default ProductsPage;
