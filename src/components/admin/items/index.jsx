import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../../../_services/items";
import "../../../styles/AdminTable.css";

const ItemsIndex = ({ setSelectedMenu, setSelectedItem }) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus item ini?");
    if (!confirmDelete) return;

    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus item.");
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="admin-section">
      <div className="admin-header">
        <input
          type="text"
          placeholder="Search..."
          className="admin-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="admin-add-btn"
          onClick={() => setSelectedMenu("create-item")}
        >
          + Add Item
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Location ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Date Reported</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.location_id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>{item.date_reported}</td>
                <td>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: "80px", height: "auto" }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button
                    className="admin-action-btn"
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedMenu("edit-item");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-action-btn delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ItemsIndex;