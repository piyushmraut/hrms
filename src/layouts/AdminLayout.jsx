// src/layouts/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;