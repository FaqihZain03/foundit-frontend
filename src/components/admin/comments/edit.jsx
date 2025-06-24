import React, { useState, useEffect } from "react";
import { updateComment } from "../../../_services/comments";
import { getItems } from "../../../_services/items";
import { getAllUsers } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function EditCommentForm({ comment, onSuccess }) {
  const [formData, setFormData] = useState({ ...comment });
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
    try {
      await updateComment(comment.id, formData);
      alert("Komentar berhasil diperbarui!");
      onSuccess();
    } catch (err) {
      alert("Gagal memperbarui komentar.");
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>✏️ Edit Komentar</h2>
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
      <button type="submit">Simpan Perubahan</button>
    </form>
  );
}
