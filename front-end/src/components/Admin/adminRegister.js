import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchCreatingUser from '../../api/fetchCreatingUser';
import { saveLocal } from '../../helpers/localStorage';

function AdminRegister() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isThereAnUser, setIsThereAnUser] = useState(false);
  const [messageError, setMessageError] = useState('');

  const checkingFormatt = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minSize = 6;
    const minName = 12;
    const isAValidEmail = emailRegex.test(email);
    const isAValidPassword = password.length >= minSize;
    const isAValidName = name.length >= minName;
    return (!(isAValidEmail && isAValidPassword && isAValidName));
  };

  const handleInputChange = async (target) => {
    if (target.name === 'name') setName(target.value);
    if (target.name === 'email') setEmail(target.value);
    if (target.name === 'password') setPassword(target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const response = await fetchCreatingUser({ name, email, password });
    const statusCode = 409;
    if (response.status === statusCode) {
      setIsThereAnUser(true);
      return setMessageError(response.data.message);
    }
    setIsThereAnUser(false);
    saveLocal('user', { email: response.data.email,
      name: response.data.name,
      token: response.data.createdToken });
    history.push('/customer/products');
  };

  return (
    <div className="Login">
      <form className="login-form">
        <h1>Register</h1>
        <label htmlFor="Nome">
          <span>Name</span>
          <input
            id="name"
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
            data-testid="common_register__input-name"
            name="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            data-testid="common_register__input-email"
            name="email"
            onChange={ ({ target }) => handleInputChange(target) }
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            type="password"
            onChange={ ({ target }) => handleInputChange(target) }
            data-testid="common_register__input-password"
            name="password"
          />
        </label>
        <select>
          <option>Administrator</option>
          <option>Costumer</option>
          <option>Seller</option>
        </select>
        <button
          disabled={ checkingFormatt() }
          type="submit"
          className="login-btn"
          onClick={ (event) => handleClick(event) }
          data-testid="common_register__button-register"
        >
          Register
        </button>
      </form>
      { isThereAnUser
            && (
              <span data-testid="common_register__element-invalid_register">
                {messageError}
              </span>
            )}
    </div>
  );
}

export default AdminRegister;
