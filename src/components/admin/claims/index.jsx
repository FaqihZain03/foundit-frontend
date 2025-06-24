import React, { useEffect, useState } from "react";
import { getClaims, deleteClaim } from "../../../_services/claims";
import ClaimForm from "./create";
import EditClaimForm from "./edit";
import "../../../styles/AdminTable.css";

const ClaimsIndex = () => {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("list");
  const [selectedClaim, setSelectedClaim] = useState(null);

  const fetchClaims = async () => {
    try {
      const data = await getClaims();
      setClaims(data);
    } catch (error) {
      console.error("Gagal mengambil data klaim:", error);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus klaim ini?")) {
      try {
        await deleteClaim(id);
        fetchClaims();
      } catch (err) {
        alert("Gagal menghapus klaim");
      }
    }
  };

  const filtered = claims.filter((c) =>
    c.status.toLowerCase().includes(search.toLowerCase())
  );

  if (mode === "create") {
    return <ClaimForm onSuccess={() => { fetchClaims(); setMode("list"); }} />;
  }

  if (mode === "edit" && selectedClaim) {
    return <EditClaimForm claim={selectedClaim} onSuccess={() => { fetchClaims(); setMode("list"); setSelectedClaim(null); }} />;
  }

  return (
    <section className="admin-section">
      <div className="admin-header">
        <input
          type="text"
          className="admin-search"
          placeholder="Search by status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="admin-add-btn" onClick={() => setMode("create")}>+ Add Claim</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.item?.name || "-"}</td>
              <td>{c.user?.username || "-"}</td>
              <td>{c.status}</td>
              <td>
                <button className="admin-action-btn" onClick={() => { setSelectedClaim(c); setMode("edit"); }}>Edit</button>
                <button className="admin-action-btn delete" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ClaimsIndex;