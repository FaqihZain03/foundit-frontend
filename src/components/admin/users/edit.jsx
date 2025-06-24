import React, { useState } from "react";
import { updateUserProfile } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function EditUserForm({ user, onSuccess }) {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert("User berhasil diupdate!");
      onSuccess();
    } catch (err) {
      console.error("Gagal update user:", err);
      alert("Terjadi kesalahan saat update.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit}>
        <h2>✏️ Edit User</h2>

        <div className="form-group">
          <label>Nama</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}
