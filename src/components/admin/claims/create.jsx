import React, { useState, useEffect } from "react";
import { createClaim } from "../../../_services/claims";
import { getItems } from "../../../_services/items";
import { getAllUsers } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function CreateClaimForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    item_id: "",
    user_id: "",
    status: "pending",
    claim_date: "",
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
    try {
      await createClaim(formData);
      alert("Klaim berhasil dibuat.");
      onSuccess();
    } catch (err) {
      console.error("Gagal membuat klaim:", err);
      alert("Gagal membuat klaim.");
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>📄 Tambahkan Klaim</h2>

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
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tanggal Klaim</label>
        <input type="date" name="claim_date" value={formData.claim_date} onChange={handleChange} />
      </div>

      <button type="submit">Simpan Klaim</button>
    </form>
  );
}
