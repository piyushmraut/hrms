import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;