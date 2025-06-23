// src/komponen/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Tambahkan FaMapMarkerAlt untuk Locations, FaBell sudah ada tapi kita bisa pakai lagi untuk menu
import { FaHome, FaBoxes, FaUsers, FaClipboardList, FaSignOutAlt, FaMapMarkerAlt, FaBell as FaNotificationBell } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: FaHome, path: '/dashboard' },
    { name: 'Items', icon: FaBoxes, path: '/items' },
    { name: 'Users', icon: FaUsers, path: '/users' },
    { name: 'Claims', icon: FaClipboardList, path: '/claims' },
    { name: 'Locations', icon: FaMapMarkerAlt, path: '/locations' },
    { name: 'Notifications', icon: FaNotificationBell, path: '/notifications' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-2xl font-bold font-[Poppins]">
      <div className="text-3xl font-extrabold mb-8 text-center border-b border-gray-700 pb-5 text-white-400">
        FoundIt Admin
      </div>

      <nav className="flex flex-col space-y-3 flex-grow">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center space-x-3 p-3 rounded-lg
              hover:bg-gray-700 transition duration-200
              ${location.pathname === item.path ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300'}
            `}
          >
            <item.icon className="w-6 h-6" />
            <span>{item.name}</span>
          </Link>
        ))}

        {/* Tombol Logout DIHAPUS DARI SINI */}
        {/*
        <button
          onClick={() => {
            console.log('Logout clicked');
          }}
          className="mt-auto flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition duration-200 text-gray-300"
        >
          <FaSignOutAlt className="w-6 h-6" />
          <span>Logout</span>
        </button>
        */}
      </nav>
    </div>
  );
};

export default Sidebar;