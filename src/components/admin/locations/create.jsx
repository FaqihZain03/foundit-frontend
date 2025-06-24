import React, { useState } from "react";
import { createLocation } from "../../../_services/locations";
import "../../../styles/ItemForm.css";

export default function CreateLocationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLocation(formData);
      alert("Lokasi berhasil ditambahkan!");
      onSuccess();
    } catch (err) {
      console.error("Gagal tambah lokasi:", err);
      alert("Terjadi kesalahan saat menambah lokasi.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit}>
        <h2>📍 Tambah Lokasi</h2>

        <div className="form-group">
          <label>Nama Lokasi</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Deskripsi</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <button type="submit">Simpan Lokasi</button>
      </form>
    </div>
  );
}