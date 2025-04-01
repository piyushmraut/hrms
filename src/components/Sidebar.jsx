import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  HomeIcon,
  ClipboardIcon,
  InboxIcon,
  CalendarIcon,
  FolderIcon,
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  ChartBarIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const { currentUser, userName } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    {
      category: "Main Menu",
      items: [
        { name: "Dashboard", icon: HomeIcon, path: "/admin/dashboard" },
        { name: "Tasks", icon: ClipboardIcon, path: "/admin/tasks" },
        { name: "Inbox", icon: InboxIcon, path: "/admin/inbox" },
        { name: "Calendar", icon: CalendarIcon, path: "/admin/calendar" },
        { name: "Projects", icon: FolderIcon, path: "/admin/projects" },
      ],
    },
    {
      category: "HR Management",
      items: [
        { name: "Employees", icon: UserGroupIcon, path: "/admin/employees" },
        { name: "Attendance", icon: ClockIcon, path: "/admin/attendance" },
        { name: "Payroll", icon: CurrencyDollarIcon, path: "/admin/payroll" },
        { name: "Hiring", icon: UserPlusIcon, path: "/admin/hiring" },
      ],
    },
    {
      category: "Analytics & Reports",
      items: [
        { name: "Reports", icon: ChartBarIcon, path: "/admin/reports" },
      ],
    },
    {
      category: "Additional",
      items: [
        { name: "Settings", icon: CogIcon, path: "/admin/settings" },
        { name: "Help & Support", icon: QuestionMarkCircleIcon, path: "/admin/help" },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center">
        <span className="text-blue-500 text-2xl">+</span>
        <span className="ml-2 text-black font-bold">Efficio</span>
      </div>

      {/* User Profile Section */}
      <div className="p-4 flex items-center space-x-3 border-b">
        <img
          src={currentUser?.photoURL || "https://th.bing.com/th/id/OIP.mmjVD2F3Bcidm7tmMFalpQHaHa?rs=1&pid=ImgDetMain"}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-black font-semibold">{userName || "Admin"}</p>
          <p className="text-gray-500 text-sm">{currentUser?.email}</p>
        </div>
        <span className="ml-auto text-gray-500">▼</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((section, index) => (
          <div key={index} className="mt-4">
            <h3 className="px-4 text-gray-500 text-xs font-semibold uppercase">
              {section.category}
            </h3>
            <ul className="mt-2">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      location.pathname === item.path
                        ? "bg-gray-100 border-l-4 border-blue-500"
                        : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-red-500"
        >
          <PowerIcon className="w-5 h-5 mr-3 text-gray-500" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;