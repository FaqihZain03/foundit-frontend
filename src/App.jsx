// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './komponen/AdminLayout';
import Login from './halaman/Login';
import Dashboard from './halaman/Dashboard';
import ItemsTable from './halaman/ItemsTable';
import Locations from './halaman/Locations'; 
import Notifications from './halaman/Notifications';
import Users from './halaman/Users'; // Pastikan Users sudah diimpor
import AdminClaimPage from './komponen/AdminClaimPage';

import './App.css';
import './index.css';

const App = () => {
  const isAuthenticated = true; // Ganti dengan logika autentikasi Anda

  return (
    <Router>
      <Routes>
        {/* Rute Login */}
        <Route path="/login" element={<Login />} />

        {/* Rute Utama dengan AdminLayout */}
        <Route
          path="/"
          element={isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />}
       >
          {/* Rute default untuk '/' akan menampilkan Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Rute spesifik untuk Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Rute untuk Items */}
          <Route path="items" element={<ItemsTable />} />

          {/* Rute untuk Locations dan Notifications */}
          <Route path="locations" element={<Locations />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="users" element={<Users />} /> 

          <Route path="claims" element={<AdminClaimPage />} /> 
       </Route>

         {/* Rute Catch-all untuk 404 */}
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
       </Routes>
    </Router>
  );
};

export default App;