import React from 'react';
import Header from '../../components/Costumer/Header';
import CardList from '../../components/Costumer/CardList';
import ShoppingCartTotal from '../../components/Costumer/ShoppingCartTotal';

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
