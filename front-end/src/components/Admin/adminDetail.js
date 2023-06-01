import React, { useContext, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import fetchGetAllUsers from '../../api/fetchGetAllUsers';
import { readLocal } from '../../helpers/localStorage';
import fetchDeleteUser from '../../api/fetchDeleteUser';
import stateGlobalContext from '../../context/stateGlobalContext';
import '../../styles/checkoutPage/checkout.css';

function AdminDetail() {
  const { arrayUsers, setArrayUsers } = useContext(stateGlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = readLocal('user');
        const result = await fetchGetAllUsers(user.token);
        setArrayUsers(result.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    fetchData().catch((error) => {
      console.error(error);
    });
  }, [setArrayUsers]);

  const deleteUser = async (id) => {
    const user = readLocal('user');
    await fetchDeleteUser(user.token, id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user1 = readLocal('user');
        const result = await fetchGetAllUsers(user1.token);
        setArrayUsers(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    const loadData = async () => {
      try {
        if (arrayUsers && arrayUsers.length > 0) {
          await fetchData();
        }
      } catch (error) { console.error(error); }
    };

    loadData().catch((error) => {
      console.error(error);
    });
  }, [arrayUsers, setArrayUsers]);

  return (
    <div className="shopping-cart-table">

      <table className="shopping-cart-table">
        <h2>User List</h2>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Delete User</th>
          </tr>
          { arrayUsers?.map((item, index) => {
            const personName = `admin_manage__element-user-table-name-${index}`;
            const email = `admin_manage__element-user-table-email-${index}`;
            const role = `admin_manage__element-user-table-role-${index}`;
            return (
              <tr key={ item.id }>
                <td data-testid={ personName }>{item.name}</td>
                <td data-testid={ email }>{item.email}</td>
                <td data-testid={ role }>{item.role}</td>
                <td>
                  <IconButton
                    type="submit"
                    onClick={ () => deleteUser(item.id) }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDetail;
