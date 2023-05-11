import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchLogin from '../../api/fetchLogin';
import { saveLocal } from '../../helpers/localStorage';

function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [messageError, setMessageError] = useState('');

  const checkingFormatt = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minSize = 6;
    const isAValidEmail = emailRegex.test(email);
    const isAValidPassword = password.length >= minSize;
    return (!(isAValidEmail && isAValidPassword));
  };

  const handleInputChange = async (target) => {
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const apiError = 404;

    const dataResult = await fetchLogin({ email, password });

    if (dataResult.status === apiError) {
      setInvalidLogin(true);
      return setMessageError('Invalid Login');
    }
    setInvalidLogin(false);
    saveLocal('user', { ...dataResult.data });
    history.push('/customer/products');
  };

  return (
    <div>
      <form className="login-form">
        <h1>Login Page</h1>
        <label htmlFor="login">
          Email
          <input
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
            value={ email }
            data-testid="common_login__input-email"
            id="email"
            name="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            onChange={ ({ target }) => handleInputChange(target) }
            value={ password }
            data-testid="common_login__input-password"
            id="password"
            name="password"
          />
        </label>
        <button
          disabled={ checkingFormatt() }
          data-testid="common_login__button-login"
          type="submit"
          name="Login"
          onClick={ (event) => handleClick(event) }

        >
          Login

        </button>
        <button
          data-testid="common_login__button-register"
          type="submit"
          onClick={ () => history.push('/register') }
        >
          Register

        </button>
      </form>
      { invalidLogin
      && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          {messageError}

        </p>)}
    </div>
  );
}

export default LoginPage;
