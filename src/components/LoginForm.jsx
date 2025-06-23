// src/components/LoginForm.jsx
import React, { useState } from 'react';
import '../styles/LoginForm.css';
import { login } from '../_services/auth';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (!formData.username || !formData.password) {
      setError('Username dan password wajib diisi.');
      setLoading(false);
      return;
    }

    try {
      const res = await login(formData.username, formData.password);

    
      onLoginSuccess(true, res.user);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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
            placeholder="Masukkan password Anda"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Memproses...' : 'Login'}
          <i className="bi bi-arrow-right ms-2"></i>
        </button>

        <div className="switch-text">
          Belum punya akun?{' '}
          <span className="switch-link" onClick={onSwitchToRegister}>
            Daftar di sini
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
