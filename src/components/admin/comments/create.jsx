import React, { useState, useEffect } from "react";
import { createComment } from "../../../_services/comments";
import { getItems } from "../../../_services/items";
import { getAllUsers } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function CreateCommentForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    item_id: "",
    user_id: "",
    content: "",
  });
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getItems().then(setItems);
    getAllUsers().then(setUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.item_id || !formData.user_id || !formData.content) {
      alert("Harap isi semua kolom!");
      return;
    }
    try {
      await createComment(formData);
      alert("Komentar berhasil ditambahkan!");
      onSuccess();
    } catch (err) {
      alert("Gagal menambahkan komentar.");
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>💬 Tambahkan Komentar</h2>
      <div className="form-group">
        <label>Item</label>
        <select name="item_id" value={formData.item_id} onChange={handleChange} required>
          <option value="">Pilih Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>User</label>
        <select name="user_id" value={formData.user_id} onChange={handleChange} required>
          <option value="">Pilih User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.username}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Isi Komentar</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required />
      </div>
      <button type="submit">Simpan Komentar</button>
    </form>
  );
}