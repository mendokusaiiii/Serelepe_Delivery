import React, { useContext, useState } from 'react';
import fetchCreatingUser from '../../api/fetchCreatingUser';
import stateGlobalContext from '../../context/stateGlobalContext';
import { readLocal } from '../../helpers/localStorage';

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isThereAnUser, setIsThereAnUser] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [role, setRole] = useState('administrator');
  const { arrayUsers, setArrayUsers } = useContext(stateGlobalContext);

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
    if (target.name === 'type') setRole(target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const user = readLocal('user');
    const response = await fetchCreatingUser(user.token, { name, email, password, role });
    const statusCode = 409;
    if (response.status === statusCode) {
      setIsThereAnUser(true);
      return setMessageError(response.data.message);
    }
    setIsThereAnUser(false);
    if (response.data.role !== 'administrator') {
      setArrayUsers([...arrayUsers, response.data]);
    }
  };

  return (
    <div>
      <form>
        <h1>Register</h1>
        <label htmlFor="Nome">
          <span>Name</span>
          <input
            id="name"
            type="text"
            onChange={ ({ target }) => handleInputChange(target) }
            data-testid="admin_manage__input-name"
            name="name"
            placeholder="Name and Surname"
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
            name="password"
            placeholder="Password"
          />
        </label>
        <label htmlFor="type">

          <select
            name="type"
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target }) => handleInputChange(target) }
          >
            <option value="administrator">Administrator</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>
        <button
          disabled={ checkingFormatt() }
          type="submit"
          className="login-btn"
          onClick={ (event) => handleClick(event) }
          data-testid="admin_manage__button-register"
        >
          Register
        </button>
      </form>
      { isThereAnUser
            && (
              <span data-testid="admin_manage__element-invalid-register">
                {messageError}
              </span>
            )}
    </div>
  );
}

export default AdminRegister;
