import React, { useEffect, useState } from "react"; 
import { getAllUsers, deleteUser } from "../../../_services/users";
import CreateUserForm from "./create";
import EditUserForm from "./edit";
import "../../../styles/AdminTable.css";

const UsersIndex = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [mode, setMode] = useState("index");

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error("Gagal menghapus user", err);
        alert("Gagal menghapus user.");
      }
    }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (mode === "create") {
    return <CreateUserForm onSuccess={() => { setMode("index"); fetchUsers(); }} />;
  }

  if (mode === "edit") {
    return <EditUserForm user={editingUser} onSuccess={() => { setMode("index"); fetchUsers(); }} />;
  }

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
        <button className="admin-add-btn" onClick={() => setMode("create")}>+ Add User</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="admin-action-btn" onClick={() => { setEditingUser(u); setMode("edit"); }}>Edit</button>
                <button className="admin-action-btn delete" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UsersIndex;