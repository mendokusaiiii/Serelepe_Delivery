import React, { useMemo } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import ShoppingCartTotal from '../../components/Customer/ShoppingCartTotal';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';
import { sumItems } from '../../helpers/cartFunctions';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
}));

jest.mock('../../helpers/cartFunctions', () => ({
  sumItems: jest.fn(),
}));

describe('ShoppingCartTotal', () => {
  let pushMock;

  function TestComponent() {
    const setMyArray = jest.fn();
    const contextValue = useMemo(() => ({ setMyArray }), [setMyArray]);

    return (
      <stateGlobalContext.Provider
        value={ contextValue }
      >
        <ShoppingCartTotal />
      </stateGlobalContext.Provider>
    );
  }

  beforeEach(() => {
    pushMock = jest.fn();
    readLocal.mockReturnValue('50');
    sumItems.mockReturnValue('50');
    useHistory.mockReturnValue({ push: pushMock });
  });

  it('Render Component', () => {
    render(<TestComponent />);
    const button = screen.getByTestId('customer_products__button-cart');
    expect(button).toBeInTheDocument();
  });

  it('Button Buy', () => {
    render(<TestComponent />);
    const button = screen.getByTestId('customer_products__button-cart');
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/customer/checkout');
  });
});
