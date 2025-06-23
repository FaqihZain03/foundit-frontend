import React, { useState, useEffect } from 'react';
import { createItem } from '../../_services/items';
import { getLocations } from '../../_services/locations';
import '../../styles/ItemForm.css';

export default function ItemForm({ user, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location_id: '',
    date_reported: '',
    status: 'found',
    image_url: null,
    user_id: user?.id || ''
  });

  const [locations, setLocations] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error('Gagal memuat lokasi:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_url') {
      const file = files[0];
      setFormData({ ...formData, image_url: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'description', 'location_id', 'date_reported', 'status'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert('Harap isi semua kolom!');
        return;
      }
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await createItem(data);
      alert('Item berhasil dilaporkan!');
      onNavigate('items');
    } catch (err) {
      console.error('Gagal membuat item:', err);
      alert('Gagal membuat item. Periksa kembali isian Anda.');
    }
  };

  return (
    <div className="item-form-container">
      <form onSubmit={handleSubmit} className="item-form" encType="multipart/form-data">
        <h2>📤 Formulir Pelaporan Barang</h2>

        <div className="form-group">
          <label>Nama Barang</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Contoh: Dompet Hitam"
            required
          />
        </div>

        <div className="form-group">
          <label>Tanggal Ditemukan</label>
          <input
            type="date"
            name="date_reported"
            value={formData.date_reported}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Contoh: Dompet berisi KTP, ATM, dan kartu pelajar..."
            required
          />
        </div>

        <div className="form-group">
          <label>Lokasi Ditemukan</label>
          <select
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Lokasi</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status Barang</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="found">Found</option>
            <option value="lost">Lost</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Gambar</label>
          <input
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <p>Preview gambar barang</p>
          </div>
        )}

        <button type="submit">🚀 Laporkan Sekarang</button>
      </form>
    </div>
  );
}
