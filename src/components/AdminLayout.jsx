import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50 overflow-auto custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;