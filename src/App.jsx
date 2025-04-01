import React from "react";
import { Link } from "react-router-dom";
import './index.css'

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">HR Management Dashboard</h1>
      <div className="space-x-4">
        <Link to="/admin-login" className="bg-blue-500 text-white p-2 rounded">
          Admin Login
        </Link>
        <Link to="/employee-login" className="bg-green-500 text-white p-2 rounded">
          Employee Login
        </Link>
      </div>
    </div>
  );
};

export default App;