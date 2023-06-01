import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoginPage from '../../pages/login/login';
import fetchLogin from '../../api/fetchLogin';

jest.mock('../../api/fetchLogin', () => jest.fn());

describe('LoginPage', () => {
  test('renderiza corretamente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <LoginPage />
      </Router>,
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  test('Login Customer sucess', async () => {
    const history = createMemoryHistory();
    const mockUser = {
      data: {
        role: 'customer',
      },
    };
    fetchLogin.mockResolvedValue({ status: 200, data: mockUser });

    render(
      <Router history={ history }>
        <LoginPage />
      </Router>,
    );

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetchLogin).toHaveBeenCalledTimes(1);
      expect(fetchLogin).toHaveBeenCalledWith(
        { email: 'test@test.com', password: 'password123' },
      );

      expect(history.location.pathname).toBe('/');
    });
  });

  test('Invalid Login', async () => {
    const history = createMemoryHistory();
    fetchLogin.mockResolvedValue({ status: 404 });

    render(
      <Router history={ history }>
        <LoginPage />
      </Router>,
    );

    const emailInput = screen.getByTestId('common_login__input-email');
    const passwordInput = screen.getByTestId('common_login__input-password');
    const loginButton = screen.getByTestId('common_login__button-login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(fetchLogin).toHaveBeenCalledTimes(1);
      expect(fetchLogin).toHaveBeenCalledWith({
        email: 'test@example.com', password: 'password123' });
      expect(screen.getByTestId(
        'common_login__element-invalid-email',
      ))
        .toHaveTextContent('Invalid Login');
    });
  });

  test('Redirect to register page', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <LoginPage />
      </Router>,
    );

    const registerButton = screen.getByTestId('common_login__button-register');
    fireEvent.click(registerButton);

    expect(history.location.pathname).toBe('/register');
  });
});
