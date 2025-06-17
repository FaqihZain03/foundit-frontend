// src/components/LoginForm.jsx
import React, { useState } from 'react';
import '../styles/LoginForm.css';

function LoginForm({ onLoginSuccess, users, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setError('');

    // Logika Otentikasi
    const user = users.find(u => u.username === formData.username && u.password === formData.password);
    if (user) {
      onLoginSuccess(true);
    } else {
      setError('Username atau password salah!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Selamat Datang!</h2>
        <p>Silakan masuk untuk melanjutkan.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            required
            autoComplete="username"
            placeholder="Masukkan username Anda"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            required
            autoComplete="current-password"
            placeholder="Masukkan password Anda"
          />
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-primary">
          Login
          <i className="bi bi-arrow-right ms-2"></i>
        </button>

        <div className="switch-text">
          Belum punya akun? {' '}
          <span className="switch-link" onClick={onSwitchToRegister}>
            Daftar di sini
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;