import React, { useMemo } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CardList from '../../components/Customer/CardList';
import fetchProduct from '../../api/fetchProducts';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';

jest.mock('../../helpers/localStorage');
jest.mock('../../api/fetchProducts');
jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
  saveLocal: jest.fn(),
}));

describe('CardList Page', () => {
  const mockProductList = [
    { id: 1, name: 'Product 1', price: { value: 10 }, url_image: 'image1.jpg' },
    { id: 2, name: 'Product 2', price: { value: 20 }, url_image: 'image2.jpg' },
  ];

  function TestComponent() {
    const setMyArray = jest.fn();
    const contextValue = useMemo(() => ({ setMyArray }), [setMyArray]);

    return (
      <stateGlobalContext.Provider value={ contextValue }>
        <CardList />
      </stateGlobalContext.Provider>
    );
  }

  it('Render CardList Page', async () => {
    readLocal.mockReturnValue([]);
    fetchProduct.mockResolvedValueOnce({ data: mockProductList });
    readLocal.mockReturnValueOnce(null);

    render(<TestComponent />);

    await waitFor(() => {
      const Element = screen.getByText('Product 1');
      const addCart1 = screen.getByTestId('customer_products__button-card-add-item-1');
      fireEvent.click(addCart1);
      const addCart2 = screen.getByTestId('customer_products__button-card-add-item-1');
      fireEvent.click(addCart2);
      const rmCart1 = screen.getByTestId('customer_products__button-card-rm-item-1');
      fireEvent.click(rmCart1);
      fireEvent.click(rmCart1);
      fireEvent.click(rmCart1);
      const inputCart1 = screen.getByTestId('customer_products__input-card-quantity-1');
      fireEvent.change(inputCart1, { target: { value: '5' } });
      expect(Element).toBeInTheDocument();
    });
  });
});
