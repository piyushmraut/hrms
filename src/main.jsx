// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import App from "./App";
// import AdminLogin from "./pages/AdminLogin";
// import EmployeeLogin from "./pages/EmployeeLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployeeDashboard";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/employee-login" element={<EmployeeLogin />} />
//           <Route
//             path="/admin-dashboard"
//             element={
//               <ProtectedRoute requiredRole="admin">
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/employee-dashboard"
//             element={
//               <ProtectedRoute requiredRole="employee">
//                 <EmployeeDashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import App from "./App";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import Dashboard from "./pages/admin/Dashboard";
import Tasks from "./pages/admin/Tasks";
import Inbox from "./pages/admin/Inbox";
import Calendar from "./pages/admin/Calendar";
import Projects from "./pages/admin/Projects";
import Employees from "./pages/admin/Employees";
import Attendance from "./pages/admin/Attendance";
import Payroll from "./pages/admin/Payroll";
import Hiring from "./pages/admin/Hiring";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Help from "./pages/admin/Help";
import EmployeeDashboard from "./pages/EmployeeDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
  <Route path="/" element={<App />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/employee-login" element={<EmployeeLogin />} />
  <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />
  <Route
    path="/admin"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="tasks" element={<Tasks />} />
    <Route path="inbox" element={<Inbox />} />
    <Route path="calendar" element={<Calendar />} />
    <Route path="projects" element={<Projects />} />
    <Route path="employees" element={<Employees />} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="payroll" element={<Payroll />} />
    <Route path="hiring" element={<Hiring />} />
    <Route path="reports" element={<Reports />} />
    <Route path="settings" element={<Settings />} />
    <Route path="help" element={<Help />} />
  </Route>
  <Route
    path="/employee-dashboard"
    element={
      <ProtectedRoute requiredRole="employee">
        <EmployeeDashboard />
      </ProtectedRoute>
    }
  />
</Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);