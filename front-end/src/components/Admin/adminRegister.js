/* eslint-disable  */
import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import fetchCreatingUserAdmin from "../../api/fetchCreatingUserAdmin";
import stateGlobalContext from "../../context/stateGlobalContext";
import { readLocal } from "../../helpers/localStorage";
import "../../styles/admin/adminRegister.css"

function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isThereAnUser, setIsThereAnUser] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [role, setRole] = useState("administrator");
  const { arrayUsers, setArrayUsers } = useContext(stateGlobalContext);

  const checkingFormatt = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minSize = 6;
    const minName = 12;
    const isAValidEmail = emailRegex.test(email);
    const isAValidPassword = password.length >= minSize;
    const isAValidName = name.length >= minName;
    return !(isAValidEmail && isAValidPassword && isAValidName);
  };

  const handleInputChange = async target => {
    if (target.name === "name") setName(target.value);
    if (target.name === "email") setEmail(target.value);
    if (target.name === "password") setPassword(target.value);
    if (target.name === "type") setRole(target.value);
  };

  const handleClick = async event => {
    event.preventDefault();
    const user = readLocal("user");
    const response = await fetchCreatingUserAdmin(user.token, {
      name,
      email,
      password,
      role
    });
    const statusCode = 409;
    if (response.status === statusCode) {
      setIsThereAnUser(true);
      return setMessageError(response.data.message);
    }
    setIsThereAnUser(false);
    if (response.data.role !== "administrator") {
      setArrayUsers([...arrayUsers, response.data]);
    }
  };

  return (
    <div className="adminRegister" style={{textAlign:'center'}}>
      <form>
        <h3>Register</h3>
        <div>
          <TextField
            id="name"
            type="text"
            onChange={({ target }) => handleInputChange(target)}
            data-testid="admin_manage__input-name"
            name="name"
            placeholder="Name and Surname"
          />
        </div>
        <div>
          <TextField
            type="email"
            id="email"
            data-testid="admin_manage__input-email"
            name="email"
            onChange={({ target }) => handleInputChange(target)}
            placeholder="Email"
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            onChange={({ target }) => handleInputChange(target)}
            data-testid="admin_manage__input-password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div>
          <FormControl>
            <Select
              name="type"
              data-testid="admin_manage__select-role"
              value={role}
              className="nativeSelect"
              onChange={({ target }) => handleInputChange(target)}
            >
              <MenuItem value="administrator">Administrator</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
            <Button
              style={{
                backgroundColor: checkingFormatt() ? "grey" : "#dd571c",
                margin: "5px",
                color: "white",
                display: "flex"
              }}
              disabled={checkingFormatt()}
              type="submit"
              className="login-btn"
              onClick={event => handleClick(event)}
              data-testid="admin_manage__button-register"
            >
              Register
            </Button>
          </FormControl>
        </div>
      </form>
      {isThereAnUser && (
        <span data-testid="admin_manage__element-invalid-register">
          {messageError}
        </span>
      )}
    </div>
  );
}

export default AdminRegister;
