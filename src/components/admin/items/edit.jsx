import React, { useState, useEffect } from "react";
import { updateItem } from "../../../_services/items";
import { getLocations } from "../../../_services/locations";
import "../../../styles/ItemForm.css";

export default function EditItemForm({ item, onSuccess }) {
  const [formData, setFormData] = useState({
    ...item,
    user_id: item.user?.id || "", // ⬅️ penting!
  });

  const [locations, setLocations] = useState([]);
  const [imagePreview, setImagePreview] = useState(item.image_url ? `/storage/items/${item.image_url}` : null);

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
    data.append("_method", "PUT");

    data.append("user_id", formData.user_id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("location_id", formData.location_id);
    data.append("status", formData.status);
    data.append("date_reported", formData.date_reported?.slice(0, 10) || "");

    if (formData.image_url instanceof File) {
      data.append("image_url", formData.image_url);
    }

    try {
      await updateItem(item.id, data);
      alert("Item berhasil diperbarui!");
      onSuccess();
    } catch (err) {
      console.error("Gagal update:", err.response?.data || err);
      alert("Gagal memperbarui item.");
    }
  };

  return (
    <div className="item-form-container">
      <form className="item-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>✏️ Edit Barang</h2>

        <div className="form-group">
          <label>Nama Barang</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Tanggal Ditemukan</label>
          <input
            type="date"
            name="date_reported"
            value={formData.date_reported?.slice(0, 10) || ""}
            onChange={handleChange}
            required
          />
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
          <label>Ganti Gambar</label>
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

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}
