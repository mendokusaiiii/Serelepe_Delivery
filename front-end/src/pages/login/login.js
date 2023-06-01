/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import fetchLogin from "../../api/fetchLogin";
import { saveLocal, readLocal } from "../../helpers/localStorage";
import logoTransparent from "../../images/logoTransparent.png";
import "../../styles/loginPage/login.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const checkingFormatt = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minSize = 6;
    const isAValidEmail = emailRegex.test(email);
    const isAValidPassword = password.length >= minSize;
    return !(isAValidEmail && isAValidPassword);
  };

  const handleInputChange = async target => {
    if (target.name === "email") setEmail(target.value);
    if (target.name === "password") setPassword(target.value);
  };

  const handleClick = async event => {
    event.preventDefault();
    const apiError = 404;

    const dataResult = await fetchLogin({ email, password });

    if (dataResult.status === apiError) {
      setInvalidLogin(true);
      return setMessageError("Invalid Login");
    }
    setInvalidLogin(false);
    saveLocal("user", { ...dataResult.data });

    if (readLocal("user").role === "customer") {
      history.push("/customer/products");
    }
    if (readLocal("user").role === "seller") {
      history.push("/seller/orders");
    }
    if (readLocal("user").role === "administrator") {
      history.push("/admin/manage");
    }
  };

  useEffect(() => {
    if (readLocal("user")) {
      if (readLocal("user").role === "customer") {
        history.push("/customer/products");
      }
      if (readLocal("user").role === "seller") {
        history.push("/seller/orders");
      }
      if (readLocal("user").role === "administrator") {
        history.push("/admin/manage");
      }
    }
  }, [history]);


  return (
    <html className="classHtml" lang="en">
      <div className="divLogin">
        <div className="divLogoSerelepe">
          <img  draggable="false" className="logoSerelepe" src={logoTransparent} alt="Logo" />
        </div>
        <form className="login-form">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > :not(style)": { m: 1 }
            }}
          >
            <h1>Welcome</h1>

            <TextField
              className="inputField"
              type="text"
              onChange={({ target }) => handleInputChange(target)}
              value={email}
              data-testid="common_login__input-email"
              id="email"
              name="email"
              label="Email"
              x={{ width: "50%" }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className="inputField"
                onChange={({ target }) => handleInputChange(target)}
                value={password}
                data-testid="common_login__input-password"
                id="password"
                name="password"
                label="Password"
                type={showPassword}
                sx={{ width: "51.5%" }}
              />
              <IconButton
                onClick={() =>
                  setShowPassword(showPassword === "text" ? "password" : "text")
                }
                edge="end"
              >
                {showPassword === "text" ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {invalidLogin && (
          <p style={{display: 'flex'}} data-testid="common_login__element-invalid-email">
            {messageError}
          </p>
        )}
            <Stack direction="row" spacing={2}>
              <Button
                style={{
                  backgroundColor: checkingFormatt() ? "grey" : "#dd571c",
                  margin: "5px",
                  color: "white",
                  display: "flex",

                }}
                disabled={checkingFormatt()}
                data-testid="common_login__button-login"
                type="submit"
                name="Login"
                onClick={event => handleClick(event)}
                color="success"
                variant="contained"
              >
                Login
              </Button>

              <Button
                variant="contained"
                style={{
                  backgroundColor: "#dd571c",
                  margin: "5px",
                  color: "white",
                  display: "flex",

                }}
                data-testid="common_login__button-register"
                type="submit"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </form>
  
      </div>

    </html>
  );
}

export default LoginPage;
