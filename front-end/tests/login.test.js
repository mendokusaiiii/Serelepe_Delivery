import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/login/login';

describe('Checking all the elements on the screen.', () => {
  const setup = () => render(<Login />);

  it('Checking if there is an email input on the screen.', () => {
    setup();
    const emailInput = screen.getByTestId('common_login__input-email');
    expect(emailInput).toBeInTheDocument();
  });

  it('Checking if there is a password input on the screen. ', () => {
    setup();
    const passwordInput = screen.getByTestId('common_login__input-password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Checking if there is a button on the screen.', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeInTheDocument();
  });

  it('Checking if the button is disabled', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toHaveAttribute('disabled');
  });

  it('Checking if there is a register button', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Register' });
    expect(button).toBeInTheDocument();
  });

  it('Checking if there are 2 buttons on the screen.', () => {
    setup();
    const button = screen.getAllByRole('button');
    expect(button).toHaveLength(2);
  });

  it('Checking if there is a Login text.', () => {
    setup();
    const loginLabel = screen.getByText('Login');
    expect(loginLabel).toBeInTheDocument();
  });

  it('Checking if there is a Password text.', () => {
    setup();
    const passwordLabel = screen.getByText('Password');
    expect(passwordLabel).toBeInTheDocument();
  });
});
