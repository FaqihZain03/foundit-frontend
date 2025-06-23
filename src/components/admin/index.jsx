import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { getItems } from "../../_services/items";
import "../../styles/admin.css";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        setError("Gagal memuat data item.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <main className="admin-main">
        <h1 className="admin-title">📦 Barang yang ditemukan</h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="card-grid">
            {items.map((item) => (
              <div key={item.id} className="item-card">
                <img
                  src={item.image || "https://via.placeholder.com/400x300"}
                  alt={item.name}
                />
                <div className="content">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <div className="footer">
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                    <button>View Detail</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
