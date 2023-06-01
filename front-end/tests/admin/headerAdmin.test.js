import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { readLocal } from '../../helpers/localStorage';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';

jest.mock('../../helpers/localStorage');

describe('Header Customer Component', () => {
  beforeEach(() => {
    readLocal.mockReturnValue({ name: 'teste seller' });
  });

  it('Render Header Customer Property', async () => {
    render(
      <BrowserRouter>
        <HeaderAdmin />
      </BrowserRouter>,
    );

    const orders = await screen.findByText('User Manager');
    const logout = await screen.findByText('Logout');

    fireEvent.click(orders);
    fireEvent.click(logout);
  });
});
