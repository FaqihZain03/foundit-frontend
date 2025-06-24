import React, { useState, useEffect } from "react";
import { createItem } from "../../../_services/items";
import { getLocations } from "../../../_services/locations";
import "../../../styles/ItemForm.css";

export default function CreateItemForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location_id: "",
    date_reported: "",
    status: "found",
    image_url: null,
    user_id: "", // ⬅️ penting
  });

  const [locations, setLocations] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error("Gagal memuat lokasi:", err);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (user?.id) {
      setFormData((prev) => ({ ...prev, user_id: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url") {
      const file = files[0];
      setFormData({ ...formData, image_url: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    try {
      await createItem(data);
      alert("Item berhasil ditambahkan!");
      onSuccess();
    } catch (error) {
      console.error("Gagal menambahkan item:", error.response?.data || error);
      alert("Terjadi kesalahan. Silakan periksa kembali input Anda.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>📝 Tambahkan Barang Baru</h2>

        <div className="form-group">
          <label>Nama Barang</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Tanggal Ditemukan</label>
          <input type="date" name="date_reported" value={formData.date_reported} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required />
        </div>

        <div className="form-group">
          <label>Lokasi</label>
          <select name="location_id" value={formData.location_id} onChange={handleChange} required>
            <option value="">Pilih Lokasi</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="found">Found</option>
            <option value="lost">Lost</option>
            <option value="claimed">Claimed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Gambar</label>
          <input type="file" name="image_url" accept="image/*" onChange={handleChange} />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <p>Preview gambar</p>
          </div>
        )}

        {/* hidden user_id */}
        <input type="hidden" name="user_id" value={formData.user_id} />

        <button type="submit">Simpan Item</button>
      </form>
    </div>
  );
}
