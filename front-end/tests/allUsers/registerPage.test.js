import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import fetchLogin from '../../api/fetchLogin';

jest.mock('../../api/fetchLogin');

describe('Register Page', () => {
  const registerButtonTestId = 'common_login__button-register';
  const nameInputTestId = 'common_register__input-name';
  const emailInputTestId = 'common_register__input-email';
  const passwordInputTestId = 'common_register__input-password';
  const confirmRegisterTestId = 'common_register__button-register';

  const mockUser = {
    role: 'costumer',
  };

  const renderApp = () => {
    render(<App />, { wrapper: MemoryRouter });
  };

  it('test register success', async () => {
    renderApp();

    fetchLogin.mockResolvedValueOnce({
      status: 200,
      data: mockUser,
    });

    const registerButton = screen.getByTestId(registerButtonTestId);
    act(() => {
      fireEvent.click(registerButton);
    });

    const nameInput = screen.getByTestId(nameInputTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const confirmRegister = screen.getByTestId(confirmRegisterTestId);

    expect(screen.getByText('Name')).toBeInTheDocument();

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'nameteste1234' } });
      fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
    });

    act(() => {
      fireEvent.click(confirmRegister);
    });
  });

  it('test invalid register inputs', async () => {
    renderApp();

    const registerButton = screen.getByTestId(registerButtonTestId);
    act(() => {
      fireEvent.click(registerButton);
    });

    const nameInput = screen.getByTestId(nameInputTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const confirmRegister = screen.getByTestId(confirmRegisterTestId);

    expect(screen.getByText('Name')).toBeInTheDocument();

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'nameteste' } });
      fireEvent.change(emailInput, { target: { value: 'teste' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
    });

    expect(confirmRegister).toBeDisabled();
  });

  it('test user already exists', async () => {
    renderApp();

    fetchLogin.mockResolvedValueOnce({
      status: 409,
      data: mockUser,
    });

    const registerButton = screen.getByTestId(registerButtonTestId);
    act(() => {
      fireEvent.click(registerButton);
    });

    const nameInput = screen.getByTestId(nameInputTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const confirmRegister = screen.getByTestId(confirmRegisterTestId);

    expect(screen.getByText('Name')).toBeInTheDocument();

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'nametesteteste' } });
      fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
    });

    await act(async () => {
      fireEvent.click(confirmRegister);
    });

    expect(await screen.findByText('User already exist')).toBeInTheDocument();
  });
});
