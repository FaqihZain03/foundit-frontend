import React, { useEffect, useState } from "react";
import { getComments, deleteComment } from "../../../_services/comments";
import CommentForm from "./create";
import EditCommentForm from "./edit";
import "../../../styles/AdminTable.css";

const CommentsIndex = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("list");
  const [selectedComment, setSelectedComment] = useState(null);

  const fetchComments = async () => {
    try {
      const data = await getComments();
      setComments(data);
    } catch (error) {
      console.error("Gagal mengambil komentar:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus komentar ini?")) {
      try {
        await deleteComment(id);
        fetchComments();
      } catch (err) {
        alert("Gagal menghapus");
      }
    }
  };

  const filtered = comments.filter((c) =>
    c.content?.toLowerCase().includes(search.toLowerCase())
  );

  if (mode === "create") {
    return <CommentForm onSuccess={() => { fetchComments(); setMode("list"); }} />;
  }

  if (mode === "edit" && selectedComment) {
    return <EditCommentForm comment={selectedComment} onSuccess={() => { fetchComments(); setMode("list"); setSelectedComment(null); }} />;
  }

  return (
    <section className="admin-section">
      <div className="admin-header">
        <input
          type="text"
          className="admin-search"
          placeholder="Search comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="admin-add-btn" onClick={() => setMode("create")}>+ Add Comment</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>User</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.item?.name || "-"}</td>
              <td>{c.user?.name || "-"}</td>
              <td>{c.content}</td>
              <td>
                <button className="admin-action-btn" onClick={() => { setSelectedComment(c); setMode("edit"); }}>Edit</button>
                <button className="admin-action-btn delete" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CommentsIndex;