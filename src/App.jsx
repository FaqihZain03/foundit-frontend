// src/App.jsx
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserDashboard from './components/UserDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([
    { 
      id: 1,
      username: 'loss90', 
      password: 'sakti123', 
      email: 'loss90@example.com',
      name: 'Loss Pratama',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ]);

  useEffect(() => {
  const savedLogin = localStorage.getItem('isLoggedIn');
  const savedUser = localStorage.getItem('currentUser');
  const savedUsers = localStorage.getItem('users');

  if (savedUsers) {
    setUsers(JSON.parse(savedUsers));
  }

  if (savedLogin === 'true' && savedUser) {
    setIsLoggedIn(true);
    setCurrentUser(JSON.parse(savedUser));
    setCurrentView('userDashboard');
  }
}, []);

  const handleLoginSuccess = (success, user) => {
    setIsLoggedIn(success);
    setCurrentUser(user);
    if (success) {
      setCurrentView('userDashboard');
      localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    }
  };

  const handleRegisterSuccess = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    console.log('User baru terdaftar:', newUser);
    console.log('Total users:', users.length);
    setCurrentView('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('dashboard');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  };

  const showLoginForm = () => {
    setCurrentView('login');
  };

  const showRegisterForm = () => {
    setCurrentView('register');
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Tampilkan dashboard user setelah login
  if (currentView === 'userDashboard' && isLoggedIn) {
    return (
      <UserDashboard 
        user={currentUser} 
        onLogout={handleLogout}
      />
    );
  }

  // Tampilkan form register
  if (currentView === 'register') {
    return (
      <RegisterForm 
        users={users}
        onRegisterSuccess={handleRegisterSuccess}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  // Tampilkan form login
  if (currentView === 'login') {
    return (
      <LoginForm 
        onLoginSuccess={handleLoginSuccess}
        users={users}
        onSwitchToRegister={showRegisterForm}
      />
    );
  }

  // Tampilkan dashboard sebagai halaman utama
  return (
    <Dashboard onLogin={showLoginForm} />
  );
}

export default App;