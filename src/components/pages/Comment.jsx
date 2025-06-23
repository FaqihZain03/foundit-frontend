import React, { useEffect, useState } from 'react';
import { getComments, createComment, deleteComment } from '../../_services/comments';
import { API } from '../../_api';
import '../../styles/CommentPage.css';
import { getItems } from '../../_services/items';


export default function CommentPage({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data); 
      } catch (err) {
        console.error(err);
        setError('Gagal mengambil data item.');
      }
    };
    fetchItems();
  }, []);
  

  useEffect(() => {
    if (!selectedItem) return;
    const fetchComments = async () => {
      setLoading(true);
      try {
        const data = await getComments(selectedItem.id);
        setComments(data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat komentar.');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [selectedItem]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      setError('Anda harus login untuk berkomentar.');
      return;
    }

    try {
      const response = await createComment({
        item_id: selectedItem.id,
        user_id: currentUser.id,
        content: newComment,
      });
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
      setError('Gagal mengirim komentar.');
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Hapus komentar ini?')) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      setError('Gagal menghapus komentar.');
    }
  };

  return (
    <div className="comment-page">
      <h2 className="title">💬 Komentar</h2>
      {error && <div className="error">{error}</div>}

      <div className="item-list">
        {items.map((item) => (
          <div
            key={item.id}
            className={`item-card ${selectedItem?.id === item.id ? 'active' : ''}`}
            onClick={() => setSelectedItem(item)}
          >
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="chat-section">
          <div
            className="chat-header"
            onClick={() => onNavigate('itemDetail', selectedItem)}
            title="Klik untuk ke detail barang"
          >
            <strong>{selectedItem.name}</strong> — lihat detail barang
          </div>
          <div className="chat-box">
            {loading ? (
              <p>Sedang memuat komentar...</p>
            ) : comments.length === 0 ? (
              <p>Belum ada komentar.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="chat-message">
                  <div className="chat-meta">
                    <span>{comment.user?.name || 'Anonim'}</span>
                    <span>{comment.created_at}</span>
                  </div>
                  <div className="chat-text">{comment.content}</div>
                </div>
              ))
            )}
          </div>

          <div className="chat-input-wrapper">
            <button className="icon-btn upload" title="Upload gambar">📷</button>
            <button className="icon-btn emoji" title="Emoji">😊</button>
            <input
              type="text"
              className="chat-input"
              placeholder="Tulis komentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleAddComment} className="send-btn" title="Kirim">🚀</button>
          </div>
        </div>
      )}
    </div>
  );
}
