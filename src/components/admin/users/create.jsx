import React, { useState } from "react";
import { createUser } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function CreateUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("User berhasil ditambahkan!");
      onSuccess();
    } catch (err) {
      console.error("Gagal menambahkan user:", err);
      alert("Terjadi kesalahan saat menambahkan user.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit}>
        <h2>👤 Tambah User</h2>

        <div className="form-group">
          <label>Nama</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Simpan User</button>
      </form>
    </div>
  );
}
