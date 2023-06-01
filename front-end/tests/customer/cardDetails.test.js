import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import CardDetails from '../../components/Customer/CardDetails';
import { readLocal } from '../../helpers/localStorage';
import fetchCardDetails from '../../api/fetchCardDetail';
import fetchSellers from '../../api/fetchSellers';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../helpers/localStorage', () => ({
  readLocal: jest.fn(),
}));

jest.mock('../../api/fetchCardDetail', () => jest.fn());
jest.mock('../../api/fetchSellers', () => jest.fn());
jest.mock('../../api/fetchSalesUpdatingStatus', () => jest.fn());

describe('CardDetails', () => {
  const mockParams = { id: '123' };

  beforeEach(() => {
    useParams.mockReturnValue(mockParams);
    readLocal.mockReturnValue({ token: 'dummy-token' });
    fetchCardDetails.mockResolvedValue({
      data: [
        {
          productId: 1,
          product: { name: 'Product 1', price: 10 },
          quantity: 2,
          sale: { totalPrice: 20,
            status: 'Em Trânsito',
            saleDate: '2023-05-18',
            sellerId: 1 },
          sellerId: 1,
        },
        {
          productId: 2,
          product: { name: 'Product 2', price: 5 },
          quantity: 3,
          sale: { totalPrice: 15,
            status: 'Em Trânsito',
            saleDate: '2023-05-19',
            sellerId: 1 },

        },
      ],
    });
    fetchSellers.mockResolvedValue([
      { id: 1, name: 'Seller 1' },
      { id: 2, name: 'Seller 2' },
    ]);
  });

  test('Test Render', async () => {
    await act(async () => {
      render(<CardDetails />);
    });

    const commonTestText = 'customer_order_details__element-';
    const buttonTestId = 'customer_order_details';
    const OrderNumber = screen
      .getByTestId(`${commonTestText}order-details-label-order-id`);

    const saleOne = screen.getByTestId(`${commonTestText}order-table-item-number-0`);

    const buttonOrder = screen.getByTestId(`${buttonTestId}__button-delivery-check`);
    expect(OrderNumber).toBeInTheDocument();
    expect(saleOne).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(buttonOrder);
    });
  });
});
