import React, { useState, useEffect } from "react";
import { updateClaim } from "../../../_services/claims";
import { getItems } from "../../../_services/items";
import { getAllUsers } from "../../../_services/users";
import "../../../styles/ItemForm.css";

export default function EditClaimForm({ claim, onSuccess }) {
  const [formData, setFormData] = useState({
    claim_date: claim.claim_date || "",
    status: claim.status || "pending",
  });

  const [itemName, setItemName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getItems().then((items) => {
      const item = items.find((i) => i.id === claim.item_id);
      setItemName(item?.name || "-");
    });
    getAllUsers().then((users) => {
      const user = users.find((u) => u.id === claim.user_id);
      setUserName(user?.username || "-");
    });
  }, [claim.item_id, claim.user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClaim(claim.id, formData);
      alert("Klaim berhasil diperbarui.");
      onSuccess();
    } catch (err) {
      console.error("Gagal memperbarui klaim:", err);
      alert("Gagal memperbarui klaim.");
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>✏️ Edit Klaim</h2>

      <div className="form-group">
        <label>Item</label>
        <input type="text" value={itemName} disabled />
      </div>

      <div className="form-group">
        <label>User</label>
        <input type="text" value={userName} disabled />
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

      <button type="submit">Simpan Perubahan</button>
    </form>
  );
}
