/* eslint-disable */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchCreatingUser from '../../api/fetchCreatingUser';
import { saveLocal } from '../../helpers/localStorage';
import '../../styles/loginPage/login.css';
import logoTransparent from "../../images/logoTransparent.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';

function RegisterPage() {
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
    console.log(response.data);
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
    <html className="classHtml" lang="en">
      <div className="divLogin">
        <div className="divLogoSerelepe">
          <img draggable="false" className="logoSerelepe" src={ logoTransparent } alt="Logo" />
        </div>
        <form className="login-form">
        <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(style)": { m: 1 }
            }}
          >
          <h1>Create Account</h1>
     

            <TextField
            className="inputField"
              id="name"
              type="text"
              onChange={ ({ target }) => handleInputChange(target) }
              data-testid="common_register__input-name"
              name="name"
              placeholder="Name"
              x={{ width: "50%" }}
            />
 
    
            <TextField
            className="inputField"
              type="text"
              id="email"
              data-testid="common_register__input-email"
              name="email"
              onChange={ ({ target }) => handleInputChange(target) }
              placeholder="Email"
              x={{ width: "50%" }}
            />

            <TextField
            className="inputField"
              id="password"
              type="password"
              placeholder='Password'
              onChange={ ({ target }) => handleInputChange(target) }
              data-testid="common_register__input-password"
              name="password"
              x={{ width: "50%" }}
            />
          
          <Button
            disabled={ checkingFormatt() }
            style={{
              backgroundColor: checkingFormatt() ? "grey" : "#dd571c",
              margin: "5px",
              color: "white",
              display: "flex",
              width: "52%",
            }}
            type="submit"
            className="login-btn"
            onClick={ (event) => handleClick(event) }
            data-testid="common_register__Button-register"
          >
            Register
          </Button>
          <Link hidden={checkingFormatt() ? false : true} style={{marginLeft: '22%'}} href="/login">
        Sign In
      </Link>
          </Box>
        </form>
        { isThereAnUser
            && (
              <span data-testid="common_register__element-invalid_register">
                {messageError}
              </span>
            )}
      </div>
    </html>
  );
}

export default RegisterPage;
