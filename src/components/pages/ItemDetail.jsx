import React, { useState } from 'react';

export default function ItemDetail() {
  const item = {
    item_id: 1,
    name: "Dompet Hitam",
    description: "Dompet berwarna hitam berisi KTP dan kartu ATM",
    location: "Kampus A - Lantai 2",
    date_reported: "2025-05-20",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/fb/13/8c/fb138cc8d1613f88c65b4386977bbe21.jpg",
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Amanda",
      content: "Ini kan punya temenku, dia kehilangannya minggu lalu!",
      created_at: "5 jam lalu"
    },
    {
      id: 2,
      user: "Denmis12",
      content: "Masih ada di meja informasi kampus semalam.",
      created_at: "2 jam lalu"
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const newEntry = {
      id: Date.now(),
      user: "Anonim",
      content: newComment,
      created_at: "Baru saja"
    };
    setComments([...comments, newEntry]);
    setNewComment("");
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex gap-6">
          <img src={item.image_url} alt={item.name} className="rounded-xl w-64 h-64 object-cover" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">📍 {item.location}</p>
            <p className="text-sm text-gray-500">🗓️ Dilaporkan: {item.date_reported}</p>
            <span className={`inline-block px-3 py-1 text-sm rounded-full my-3 ${
              item.status === 'Found' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {item.status}
            </span>
            <div>
              <button className="bg-blue-600 text-white px-4 py-1 text-sm rounded-md hover:bg-blue-700">
                Klaim
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-xl p-4 mt-6">
          <h3 className="text-lg font-semibold mb-4">Komentar</h3>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg shadow p-3 border">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-800">{comment.user}</span>
                  <span className="text-xs text-gray-400">{comment.created_at}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 border-t pt-3">
            <input
              type="text"
              placeholder="Tulis komentar..."
              className="flex-1 p-2 text-sm border rounded-md"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}