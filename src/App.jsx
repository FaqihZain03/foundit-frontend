// src/App.jsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // Ubah ke 'dashboard' sebagai default
  const [users, setUsers] = useState([
    { 
      id: 1,
      username: 'loss90', 
      password: 'sakti123', 
      email: 'loss90@example.com',
      createdAt: '2024-01-01T00:00:00.000Z'
    }
  ]);

  const handleLoginSuccess = (success) => {
    setIsLoggedIn(success);
    // Setelah login berhasil, bisa kembali ke dashboard atau halaman lain
    if (success) {
      setCurrentView('success'); // Tampilkan halaman sukses
    }
  };

  const handleRegisterSuccess = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    console.log('User baru terdaftar:', newUser);
    console.log('Total users:', users.length + 1);
    // Setelah register berhasil, kembali ke login
    setCurrentView('login');
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
  };

  // Tampilkan halaman sukses setelah login
  if (currentView === 'success' && isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h1 style={{ 
            color: '#2c3e50', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎉 Login Berhasil!
          </h1>
          <p style={{ 
            color: '#7f8c8d', 
            marginBottom: '2rem',
            fontSize: '1.1em',
            lineHeight: '1.6'
          }}>
            Selamat datang di dashboard! Anda telah berhasil masuk ke sistem.
          </p>
          <div style={{
            background: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#2c3e50', margin: '0 0 1rem 0' }}>Informasi Sistem:</h3>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>
              📊 Total pengguna terdaftar: <strong>{users.length}</strong>
            </p>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>
              🕒 Waktu login: <strong>{new Date().toLocaleString('id-ID')}</strong>
            </p>
          </div>
          <button 
            onClick={backToDashboard}
            style={{
              padding: '0.8rem 2rem',
              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
            }}
          >
            🚪 Kembali ke Dashboard
          </button>
        </div>
      </div>
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