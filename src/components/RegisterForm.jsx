// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import '../styles/RegisterForm.css';

function RegisterForm({ users, onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess('');

    // Validasi form
    if (!formData.username.trim()) {
      setError('Username tidak boleh kosong!');
      return;
    }

    if (!formData.email.trim()) {
      setError('Email tidak boleh kosong!');
      return;
    }

    if (!formData.password.trim()) {
      setError('Password tidak boleh kosong!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password harus minimal 6 karakter!');
      return;
    }

    // Validasi email format sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid!');
      return;
    }

    // Cek duplikasi username
    if (users.find(u => u.username === formData.username)) {
      setError('Username sudah digunakan!');
      return;
    }

    // Cek duplikasi email
    if (users.find(u => u.email === formData.email)) {
      setError('Email sudah digunakan!');
      return;
    }

    // Buat akun baru
    const newUser = {
      id: Date.now(), // ID sederhana berdasarkan timestamp
      username: formData.username,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };

    onRegisterSuccess(newUser);
    setSuccess('Akun berhasil dibuat! Mengalihkan ke halaman login...');
    
    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // Beralih ke login setelah 2 detik
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Buat Akun Baru</h2>
        <p>Daftar untuk membuat akun baru dan mulai menggunakan layanan kami.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

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
            placeholder="Pilih username unik Anda"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            required
            autoComplete="email"
            placeholder="Masukkan alamat email Anda"
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
            autoComplete="new-password"
            placeholder="Buat password yang kuat (min. 6 karakter)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            required
            autoComplete="new-password"
            placeholder="Ulangi password Anda"
          />
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-success">
          Daftar Sekarang
          <i className="bi bi-person-plus ms-2"></i>
        </button>

        <div className="switch-text">
          Sudah punya akun? {' '}
          <span className="switch-link" onClick={onSwitchToLogin}>
            Login di sini
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;