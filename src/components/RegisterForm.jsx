import React, { useState } from 'react';
import '../styles/RegisterForm.css';
import { register } from '../_services/auth';

function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '', // Ganti dari 'username'
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!formData.name.trim()) return setError('Nama tidak boleh kosong!');
    if (!formData.email.trim()) return setError('Email tidak boleh kosong!');
    if (!formData.password.trim()) return setError('Password tidak boleh kosong!');
    if (formData.password !== formData.confirmPassword) return setError('Password tidak cocok!');
    if (formData.password.length < 6) return setError('Password minimal 6 karakter!');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setError('Format email tidak valid!');

    try {
      const res = await register(formData.name, formData.email, formData.password);
      setSuccess("Registrasi berhasil! Silakan login.");
      if (onRegisterSuccess) onRegisterSuccess(res.data);

      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registrasi gagal.';
      setError(msg);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Buat Akun Baru</h2>
        <p>Daftar untuk mulai menggunakan layanan kami.</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="name">Nama Lengkap:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Alamat email aktif"
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Minimal 6 karakter"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Ulangi password"
            autoComplete="new-password"
            required
          />
        </div>

        <button type="button" onClick={handleSubmit} className="btn btn-success">
          Daftar Sekarang <i className="bi bi-person-plus ms-2"></i>
        </button>

        <div className="switch-text">
          Sudah punya akun?{' '}
          <span className="switch-link" onClick={onSwitchToLogin}>
            Login di sini
          </span>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
