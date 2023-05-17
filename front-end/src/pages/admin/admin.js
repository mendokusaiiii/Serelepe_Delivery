import React, { useMemo, useState } from 'react';
import HeaderAdmin from '../../components/Admin/HeaderAdmin';
import AdminDetail from '../../components/Admin/adminDetail';
import AdminRegister from '../../components/Admin/adminRegister';
import stateGlobalContext from '../../context/stateGlobalContext';

function Admin() {
  const [arrayUsers, setArrayUsers] = useState([]);

  const stateValue = useMemo(() => ({ arrayUsers,
    setArrayUsers }), [
    arrayUsers,
    setArrayUsers,
  ]);

  return (
    <div>
      <stateGlobalContext.Provider value={ stateValue }>
        <HeaderAdmin />
        <AdminRegister />
        <AdminDetail />
      </stateGlobalContext.Provider>
    </div>
  );
}

export default Admin;
