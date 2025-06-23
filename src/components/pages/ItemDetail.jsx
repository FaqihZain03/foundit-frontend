import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showItem, claimItem } from '../../_services/items';
import '../../styles/ItemDetail.css';
import { itemImageSTORAGE } from '../../_api';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await showItem(id);
        setItem(response); // response sudah sesuai objek item
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data item.');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleClaim = async () => {
    const confirm = window.confirm("Apakah kamu yakin ingin klaim barang ini?");
    if (!confirm) return;

    try {
      await claimItem(id);
      alert("Berhasil klaim barang!");
      setItem(prev => ({ ...prev, status: "Claimed" }));
    } catch (err) {
      alert("Gagal klaim item.");
      console.error(err);
    }
  };

  if (loading) return <div className="loading-message">Memuat detail item...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!item) return <div className="error-message">Item tidak ditemukan.</div>;

  return (
    <section className="item-detail-section">
      <div className="container">
        {/* Gambar */}
        <div className="item-image-wrapper">
          <img
            src={`${itemImageSTORAGE}/items/${item.image}`}
            alt={item.name}
            className="item-image"
          />
        </div>

        {/* Detail */}
        <div className="item-info">
          <h1 className="item-title">{item.name}</h1>
          <p className="item-description">{item.description}</p>

          <div className="item-meta">
            📍 Lokasi: {item.location?.name || '-'} <br />
            🗓️ Dilaporkan: {item.date_reported}
          </div>

          <span
            className={`item-status ${
              item.status === 'Found'
                ? 'status-found'
                : item.status === 'Claimed'
                ? 'status-claimed'
                : 'status-lost'
            }`}
          >
            {item.status}
          </span>

          <div className="item-actions">
            <button onClick={() => navigate(-1)} className="btn-back">
              Kembali
            </button>
            {item.status !== 'Claimed' && (
              <button onClick={handleClaim} className="btn-claim">
                Klaim Item
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
