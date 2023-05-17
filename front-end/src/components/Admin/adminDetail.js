import React, { useEffect, useState } from 'react';
import fetchGetAllUsers from '../../api/fetchGetAllUsers';
import { readLocal } from '../../helpers/localStorage';
import fetchDeleteUser from '../../api/fetchDeleteUser';

function AdminDetail() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user = readLocal('user');
      const result = await fetchGetAllUsers(user.token);
      setAllUsers(result.data);
    }
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    const user = readLocal('user');
    const userToBeDeleted = await fetchDeleteUser(user.token, id);
    const result = await fetchGetAllUsers(user.token);
    setAllUsers(result.data);
    return userToBeDeleted;
  };
  return (
    <>
      <h3>User List</h3>
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Delete Item</th>
          </tr>
          { allUsers && allUsers.map((item, index) => {
            const itemNumber = `admin_manage__element-user-table-item-number-${index}`;
            const personName = `admin_manage__element-user-table-name-${index}`;
            const email = `admin_manage__element-user-table-email-${index}`;
            const role = `admin_manage__element-user-table-role-${index}`;
            const deleteItem = `admin_manage_element-user-table-remove-${index}`;
            return (
              <tr key={ item.id }>
                <td data-testid={ itemNumber }>{ index + 1 }</td>
                <td data-testid={ personName }>{ item.name }</td>
                <td data-testid={ email }>{item.email }</td>
                <td data-testid={ role }>{ item.role }</td>
                <td data-tesid={ deleteItem }>
                  <button
                    type="button"
                    onClick={ () => deleteUser(item.id) }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AdminDetail;
