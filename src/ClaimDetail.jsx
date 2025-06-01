import React, { useState } from 'react';

export default function ClaimDetail() {
  const item = {
    item_id: 4,
    name: "Botol Minum",
    description: "Tumbler hijau merk Lock&Lock",
    location: "Kantin Fakultas Teknik",
    date_reported: "2025-05-21",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/98/9a/63/989a63cbd7852680ba4d13897af520f9.jpg",
  };

  const [claimInfo, setClaimInfo] = useState({
    user_name: "",
    user_email: "",
    ownership_proof: "",
    proof_image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "proof_image") {
      setClaimInfo({ ...claimInfo, proof_image: files[0] });
    } else {
      setClaimInfo({ ...claimInfo, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!claimInfo.user_name || !claimInfo.user_email || (!claimInfo.ownership_proof && !claimInfo.proof_image)) {
      alert("Harap lengkapi semua data klaim!");
      return;
    }

    const formData = new FormData();
    formData.append("user_name", claimInfo.user_name);
    formData.append("user_email", claimInfo.user_email);
    formData.append("ownership_proof", claimInfo.ownership_proof);
    if (claimInfo.proof_image) {
      formData.append("proof_image", claimInfo.proof_image);
    }

    console.log("Form data siap dikirim.");
    alert("Klaim berhasil dikirim!");
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
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Kirim Klaim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
