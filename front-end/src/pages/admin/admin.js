import React from 'react';
import Header from '../../components/Costumer/Header';
import AdminDetail from '../../components/Admin/adminDetail';
import AdminRegister from '../../components/Admin/adminRegister';

function Admin() {
  return (
    <div>
      <Header />
      <AdminRegister />
      <AdminDetail />
    </div>
  );
}

export default Admin;
