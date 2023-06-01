import React, { useMemo } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import fetchSales from '../../api/fetchSales';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';
import { sumItemsValue } from '../../helpers/cartFunctions';
import fetchSellers from '../../api/fetchSellers';
import CheckoutPage from '../../components/Customer/checkout';

jest.mock('../../api/fetchSales');
jest.mock('../../api/fetchSellers');
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
}));

jest.mock('../../helpers/cartFunctions', () => ({
  sumItemsValue: jest.fn(),
}));

describe('CheckoutPage', () => {
  function TestComponent() {
    const setMyArray = jest.fn();

    const contextValue = useMemo(() => {
      const myArray = [
        { id: 2, name: 'Heineken 600ml', price: '7.50', quantity: 1 },
        { id: 2, name: 'Product 2', quantity: 3, price: '15' },
      ];

      return { setMyArray, myArray };
    }, [setMyArray]);

    return (
      <stateGlobalContext.Provider value={ contextValue }>
        <CheckoutPage />
      </stateGlobalContext.Provider>
    );
  }

  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useHistory.mockReturnValue({ push: pushMock });
    readLocal.mockReturnValue([]);
    jest.clearAllMocks();
  });

  it('Render Checkout', () => {
    const mockSellers = [
      { id: 1, name: 'Seller 1' },
      { id: 2, name: 'Seller 2' },
    ];
    const mockTotalPrice = 80.00;

    sumItemsValue.mockReturnValueOnce(mockTotalPrice);
    fetchSellers.mockResolvedValueOnce(mockSellers);

    render(<TestComponent />);
  });

  it('Fetch Sellers', async () => {
    const mockSellers = [
      { id: 1, name: 'Seller 1' },
      { id: 2, name: 'Seller 2' },
    ];
    const mockTotalPrice = 80.00;
    const mockSaleId = 12345;

    sumItemsValue.mockReturnValueOnce(mockTotalPrice);
    fetchSellers.mockResolvedValueOnce(mockSellers);
    fetchSales.mockResolvedValueOnce({ data: { saleId: mockSaleId } });

    render(<TestComponent />);

    fireEvent.click(screen.getByTestId('customer_checkout__button-submit-order'));
  });
});
