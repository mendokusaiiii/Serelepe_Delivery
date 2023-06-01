import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import OrderDetailSeller from '../../components/Seller/CardDetailSeller';
import { readLocal } from '../../helpers/localStorage';
import fetchCardDetails from '../../api/fetchCardDetail';
import fetchSalesUpdatingStatus from '../../api/fetchSalesUpdatingStatus';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
}));

jest.mock('../../api/fetchCardDetail', () => jest.fn());
jest.mock('../../api/fetchSalesUpdatingStatus', () => jest.fn());

describe('OrderDetailSeller', () => {
  const mockParams = { id: '123' };

  beforeEach(() => {
    useParams.mockReturnValue(mockParams);
    readLocal.mockReturnValue({ token: 'dummy-token' });
    fetchCardDetails.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Product 1',
          quantity: 2,
          product: { price: 10 },
          sale: { totalPrice: 20, status: 'Preparando', saleDate: '2023-05-18' },
        },
        {
          id: 2,
          name: 'Product 2',
          quantity: 3,
          product: { price: 5 },
          sale: { totalPrice: 15, status: 'Preparando', saleDate: '2023-05-19' },
        },
      ],
    });
    fetchSalesUpdatingStatus.mockResolvedValue({});
  });

  test('Seller order details', async () => {
    await act(async () => {
      render(<OrderDetailSeller />);
    });

    const commomTextId = 'seller_order_details__button';
    const preparingButton = screen.getByTestId(
      `${commomTextId}-preparing-check`,
    );
    const dispatchButton = screen.getByTestId(`${commomTextId}-dispatch-check`);

    expect(preparingButton).toHaveTextContent('Order Preparative');
    expect(dispatchButton).toHaveTextContent('Out to Delivery');

    await act(async () => {
      fireEvent.click(preparingButton);
      fireEvent.click(dispatchButton);
    });
  });
});
