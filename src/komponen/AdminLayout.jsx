// src/komponen/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Pastikan path ini benar
import Navbar from './Navbar';   // Pastikan path ini benar

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar di kiri */}

      {/* Konten Utama: Navbar dan Area Konten Dinamis */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar /> {/* Navbar di bagian atas */}

        {/* Area konten yang akan diisi oleh komponen rute (Dashboard, ItemsTable, dll.) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          <Outlet /> {/* Ini adalah tempat komponen rute akan di-render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;