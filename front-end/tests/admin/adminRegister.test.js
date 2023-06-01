import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AdminRegister from '../../components/Admin/adminRegister';
import stateGlobalContext from '../../context/stateGlobalContext';

describe('AdminRegister', () => {
  it('Register new user', async () => {
    render(
      <stateGlobalContext.Provider
        value={ {
          arrayUsers: [
            { id: 1, name: 'User 1', email: 'user1@example.com', role: 'admin' },
            { id: 2, name: 'User 2', email: 'user2@example.com', role: 'user' },
          ],
          setArrayUsers: jest.fn(),
          sellerStatus: [],
          setSellerStatus: jest.fn(),
        } }
      >
        <AdminRegister />
      </stateGlobalContext.Provider>,

    );

    const nameInput = screen.getByTestId('admin_manage__input-name');
    const emailInput = screen.getByTestId('admin_manage__input-email');
    const passwordInput = screen.getByTestId('admin_manage__input-password');
    const roleSelect = screen.getByTestId('admin_manage__select-role');
    const registerButton = screen.getByTestId('admin_manage__button-register');

    fireEvent.change(nameInput, { target: { value: 'teste teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste.teste@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(roleSelect, { target: { value: 'administrator' } });

    fireEvent.click(registerButton);
  });

  it('Invalid Register', async () => {
    render(
      <stateGlobalContext.Provider
        value={ {
          arrayUsers: [
            { id: 1, name: 'User 1', email: 'user1@example.com', role: 'admin' },
            { id: 2, name: 'User 2', email: 'user2@example.com', role: 'user' },
          ],
          setArrayUsers: jest.fn(),
          sellerStatus: [],
          setSellerStatus: jest.fn(),
        } }
      >
        <AdminRegister />
      </stateGlobalContext.Provider>,
    );

    const nameInput = screen.getByTestId('admin_manage__input-name');
    const emailInput = screen.getByTestId('admin_manage__input-email');
    const passwordInput = screen.getByTestId('admin_manage__input-password');
    const roleSelect = screen.getByTestId('admin_manage__select-role');
    const registerButton = screen.getByTestId('admin_manage__button-register');

    fireEvent.change(nameInput, { target: { value: 'teste teste' } });
    fireEvent.change(emailInput, { target: { value: 'teste-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(roleSelect, { target: { value: 'administrator' } });

    fireEvent.click(registerButton);
  });
});
