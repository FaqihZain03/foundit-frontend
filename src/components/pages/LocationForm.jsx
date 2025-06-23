import React, { useState } from 'react';
import { API } from '../../_api';
import '../../styles/LocationForm.css'; // buat file ini untuk styling jika belum

export default function LocationForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await API.post('/locations', {
        name,
        description,
      });
      setSuccess('Lokasi berhasil ditambahkan!');
      setName('');
      setDescription('');
    } catch (err) {
      setError('Gagal menambahkan lokasi.');
      console.error(err);
    }
  };

  return (
    <div className="location-form-container">
      <h2>Tambah Lokasi</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit} className="location-form">
        <div className="form-group">
          <label>Nama Lokasi</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <button type="submit">Simpan Lokasi</button>
      </form>
    </div>
  );
}
