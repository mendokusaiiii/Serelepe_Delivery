import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OrderSeller from '../../components/Seller/OrderSeller';
import { readLocal } from '../../helpers/localStorage';
import fetchSalesByRoleId from '../../api/fetchGetSalesByRoleId';
import fetchGetUserId from '../../api/fetchGetUserId';

jest.mock('../../api/fetchGetSalesByRoleId');
jest.mock('../../api/fetchGetUserId');
jest.mock('../../helpers/localStorage');

describe('OrderSeller Component', () => {
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
            deliveryAddress: 'Test Address',
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

  it('Render Order Seller', async () => {
    render(
      <BrowserRouter>
        <OrderSeller />
      </BrowserRouter>,
    );

    await screen.findByTestId('seller_orders__element-order-id--1');
  });
});
