// src/komponen/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logika logout Anda di sini
    // Misalnya, menghapus token dari localStorage
    // localStorage.removeItem('authToken');
    navigate('/login'); // Arahkan ke halaman login
  };

  return (
    <header className="bg-white shadow-md p-6 flex justify-between items-center z-10 w-full">
      {/* Ini adalah judul header yang akan selalu tampil di Navbar */}
      {/* Anda bisa mengubahnya menjadi logo, atau mengosongkannya jika Anda ingin judul halaman muncul di konten utama */}
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>

      <div className="flex items-center space-x-4">
        {/* Tombol Search (Header) */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition">
          <FaSearch className="text-xl text-gray-600" />
        </button>

        {/* Notifikasi */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition relative">
          <FaBell className="text-xl text-gray-600" />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
        </button>

        {/* Info Pengguna */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-3xl text-gray-600" />
          <span className="font-semibold text-gray-700">Admin User</span>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;