import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserDashboard from './components/UserDashboard';
import ItemDetail from './components/pages/ItemDetail';
import ClaimDetail from './components/pages/ClaimDetail';
import CommentPage from './components/pages/Comment';

// Admin
import AdminLogin from './components/admin/login';
import AdminDashboard from './components/admin/index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminAccessToken'); // ✅ disamakan

    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }

    if (adminToken) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (success, user) => {
    if (success) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(user));
      if (user.token) localStorage.setItem('token', user.token);
      navigate('/dashboard');
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminUserInfo');
    navigate('/admin');
  };

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={() => navigate('/register')}
            />
          )
        }
      />
      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <RegisterForm
              onRegisterSuccess={() => {}}
              onSwitchToLogin={() => navigate('/login')}
            />
          )
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
      />
      <Route
        path="/admin/dashboard"
        element={
          isAdminLoggedIn ? (
            <AdminDashboard onLogout={handleAdminLogout} />
          ) : (
            <Navigate to="/admin" />
          )
        }
      />


      {/* User Authenticated */}
      {isLoggedIn ? (
        <>
          <Route path="/dashboard" element={<UserDashboard user={currentUser} onLogout={handleLogout} />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/claim/:id" element={<ClaimDetail />} />
          <Route path="/comments" element={<CommentPage />} />
        </>
      ) : (
        <>
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/items/:id" element={<Navigate to="/login" />} />
          <Route path="/claim/:id" element={<Navigate to="/login" />} />
          <Route path="/comments" element={<Navigate to="/login" />} />
        </>
      )}

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
