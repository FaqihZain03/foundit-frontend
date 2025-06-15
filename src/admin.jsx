import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  // Dummy data
  const items = [
    { id: 1, name: "Dompet Hitam", location: "Gedung A", reporter: "Budi", date: "2025-06-12" },
    { id: 2, name: "Kunci Motor", location: "Gedung B", reporter: "Sari", date: "2025-06-13" },
  ];

  const totalItems = items.length;
  const totalUsers = 12; // contoh dummy

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600">Dashboard Admin</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-gray-500">Total Barang Ditemukan</p>
          <p className="text-2xl font-semibold text-red-500">{totalItems}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <p className="text-gray-500">Total Pengguna</p>
          <p className="text-2xl font-semibold text-red-500">{totalUsers}</p>
        </div>
      </div>

      {/* Tabel Barang */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-red-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Nama Barang</th>
              <th className="px-4 py-3">Lokasi</th>
              <th className="px-4 py-3">Pelapor</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.reporter}</td>
                <td className="px-4 py-2">{item.date}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;