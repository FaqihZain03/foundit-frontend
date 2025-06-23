import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, itemImageSTORAGE } from '../../_api';
import '../../styles/Items.css';

export default function Items() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get('/items');
        setItems(response.data);
      } catch (err) {
        setError('Gagal memuat data item.');
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  const handleDetail = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  return (
    <section className="items-section">
      <div className="items-header">
        <h2>Laporan Barang</h2>
        <p>Temukan barang hilang atau ditemukan oleh orang lain di sekitar Anda.</p>
      </div>

      {error && <div className="items-error">{error}</div>}

      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <div className="item-image-container">
              <img
                className="item-image"
                src={
                  item.image_url?.startsWith('http')
                    ? item.image_url
                    : `${itemImageSTORAGE}/items/${item.image_url}`
                }
                alt={item.name}
              />
            </div>
            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p>📍 {item.location?.name}</p>
              <p>🗓️ {item.date_reported}</p>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>

              {item.status.toLowerCase() !== 'claimed' && (
                <div className="item-button-container">
                  <button onClick={() => handleDetail(item.id)}>Klaim</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
