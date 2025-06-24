import React, { useEffect, useState } from "react";
import { getLocations, deleteLocation } from "../../../_services/locations";
import "../../../styles/AdminTable.css";

const LocationsIndex = ({ setSelectedMenu, setSelectedItem }) => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };
    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus lokasi ini?")) {
      try {
        await deleteLocation(id);
        setLocations((prev) => prev.filter((loc) => loc.id !== id));
      } catch (err) {
        console.error("Gagal menghapus lokasi", err);
      }
    }
  };

  const filtered = locations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="admin-section">
      <div className="admin-header">
        <input
          type="text"
          className="admin-search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="admin-add-btn"
          onClick={() => setSelectedMenu("create-location")}
        >
          + Add Location
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.description}</td>
              <td>
                <button
                  className="admin-action-btn"
                  onClick={() => {
                    setSelectedItem(l);
                    setSelectedMenu("edit-location");
                  }}
                >
                  Edit
                </button>
                <button
                  className="admin-action-btn delete"
                  onClick={() => handleDelete(l.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LocationsIndex;