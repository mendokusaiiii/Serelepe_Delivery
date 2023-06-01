import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardOrder from '../../components/Customer/CardOrder';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';

import fetchGetUserId from '../../api/fetchGetUserId';
import fetchSalesByRoleId from '../../api/fetchGetSalesByRoleId';

jest.mock('../../api/fetchGetUserId');
jest.mock('../../api/fetchGetSalesByRoleId');
jest.mock('../../helpers/localStorage');

const mockContextValue = {
  sellerStatus: {},
  setSellerStatus: jest.fn(),
};

describe('CardOrder Component', () => {
  beforeEach(() => {
    readLocal.mockReturnValue({ email: 'teste@teste.com' });

    fetchGetUserId.mockResolvedValue({
      data: { userId: { id: 3 } },
    });

    fetchSalesByRoleId.mockResolvedValue({
      data: [
        {
          saleId: 1,
          sale: {
            saleDate: '2023-05-18',
            status: 'Delivered',
            totalPrice: 50.99,
          },
          product: {
            name: 'Product 1',
            price: 10.99,
          },
          quantity: 3,
        },
      ],
    });
  });

  it('should render the card orders with correct information', async () => {
    render(
      <BrowserRouter>
        <stateGlobalContext.Provider value={ mockContextValue }>
          <CardOrder />
        </stateGlobalContext.Provider>
      </BrowserRouter>,
    );

    await screen.findByTestId('customer_orders__element-order-id-1');
  });
});
