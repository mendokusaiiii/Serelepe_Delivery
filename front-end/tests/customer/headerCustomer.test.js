import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import Header from '../../components/Customer/Header';

jest.mock('../../helpers/localStorage');

describe('Header Customer Component', () => {
  beforeEach(() => {
    readLocal.mockReturnValue({ name: 'teste user' });
  });

  it('Render Header Customer Property', async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const products = await screen.findByText('Products');
    const orders = await screen.findByText('Orders');
    const logout = await screen.findByText('Logout');

    fireEvent.click(products);
    fireEvent.click(orders);
    fireEvent.click(logout);
  });
});
