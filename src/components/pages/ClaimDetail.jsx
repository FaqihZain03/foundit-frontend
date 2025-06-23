import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClaim } from '../../_services/claims';
import { API, itemImageSTORAGE } from '../../_api';

export default function ClaimDetail() {
  const { id } = useParams(); // ambil id item dari URL
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [claimInfo, setClaimInfo] = useState({
    user_name: '',
    user_email: '',
    ownership_proof: '',
    proof_image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch detail item berdasarkan id
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await API.get(`/items/${id}`);
        setItem(response.data.data || response.data); // sesuaikan response API-mu
        setLoading(false);
      } catch (err) {
        console.error('Gagal memuat data item:', err);
        setError('Gagal memuat data item.');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'proof_image') {
      setClaimInfo({ ...claimInfo, proof_image: files[0] });
    } else {
      setClaimInfo({ ...claimInfo, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!claimInfo.user_name || !claimInfo.user_email || (!claimInfo.ownership_proof && !claimInfo.proof_image)) {
      alert('Harap lengkapi semua data klaim!');
      return;
    }

    const formData = new FormData();
    formData.append('user_name', claimInfo.user_name);
    formData.append('user_email', claimInfo.user_email);
    formData.append('ownership_proof', claimInfo.ownership_proof);
    formData.append('item_id', id);
    if (claimInfo.proof_image) {
      formData.append('proof_image', claimInfo.proof_image);
    }

    try {
      await createClaim(formData);
      alert('Klaim berhasil dikirim!');
      setClaimInfo({
        user_name: '',
        user_email: '',
        ownership_proof: '',
        proof_image: null,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Gagal mengirim klaim:', error);
      alert('Terjadi kesalahan saat mengirim klaim.');
    }
  };

  if (loading) return <div className="p-6 text-center">Memuat data item...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!item) return <div className="p-6 text-center">Data item tidak ditemukan.</div>;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-6">
          <img
            src={
              item.image_url?.startsWith('http')
                ? item.image_url
                : `${itemImageSTORAGE}/items/${item.image_url}`
            }
            alt={item.name}
            className="rounded-xl w-64 h-64 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">📍 {item.location?.name || item.location || 'Lokasi tidak tersedia'}</p>
            <p className="text-sm text-gray-500">🗓️ Dilaporkan: {item.date_reported || '-'}</p>
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full my-3 ${
                item.status === 'Found' || item.status === 'found'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Formulir Klaim</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="user_name"
              value={claimInfo.user_name}
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className="w-full border rounded-md p-2 text-sm"
            />
            <input
              type="email"
              name="user_email"
              value={claimInfo.user_email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded-md p-2 text-sm"
            />
            <textarea
              name="ownership_proof"
              value={claimInfo.ownership_proof}
              onChange={handleChange}
              placeholder="Deskripsi bukti kepemilikan..."
              rows={4}
              className="w-full border rounded-md p-2 text-sm"
            />
            <input
              type="file"
              name="proof_image"
              onChange={handleChange}
              className="w-full border rounded-md p-2 text-sm"
            />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-black px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
              >
                Kirim Klaim
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 text-sm"
              >
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
