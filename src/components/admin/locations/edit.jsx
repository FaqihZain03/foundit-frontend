import React, { useState } from "react";
import { updateLocation } from "../../../_services/locations";
import "../../../styles/ItemForm.css";

export default function EditLocationForm({ location, onSuccess }) {
  const [formData, setFormData] = useState({ ...location });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLocation(location.id, formData);
      alert("Lokasi berhasil diupdate!");
      onSuccess();
    } catch (err) {
      console.error("Gagal update lokasi:", err);
      alert("Gagal memperbarui lokasi.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit}>
        <h2>✏️ Edit Lokasi</h2>

        <div className="form-group">
          <label>Nama Lokasi</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}