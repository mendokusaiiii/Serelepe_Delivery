import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import HeaderSeller from '../../components/Seller/HeaderSeller';

jest.mock('../../helpers/localStorage');

describe('Header Customer Component', () => {
  beforeEach(() => {
    readLocal.mockReturnValue({ name: 'teste seller' });
  });

  it('Render Header Customer Property', async () => {
    render(
      <BrowserRouter>
        <HeaderSeller />
      </BrowserRouter>,
    );

    const orders = await screen.findByText('Orders');
    const logout = await screen.findByText('Logout');

    fireEvent.click(orders);
    fireEvent.click(logout);
  });
});
