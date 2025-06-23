import React from "react";
import Sidebar from "../komponen/Sidebar";
// import ItemCard from "../komponen/ItemCard"; // Hapus baris ini karena ItemCard tidak lagi digunakan sebagai komponen terpisah

const dummyItems = [
  {
    id: 1, // Tambahkan 'id' karena ini penting untuk 'key' saat mapping
    name: "Backpack hitam",
    description: "Ditemukan dekat parkiran fakultas feb",
    status: "Found",
    image: "https://via.placeholder.com/400x300",
  },
  {
    id: 2, // Tambahkan 'id'
    name: "Payung merah",
    description: "Ditemukan ibu kantin di kantin bu jamilah",
    status: "Claimed",
    image: "/img/payung.jpg", // Pastikan path ini benar dan gambar ada di folder public/img
  },
  {
    id: 3, // Tambahkan 'id'
    name: "Laptop Hp",
    description: "Ditemukan di labtek",
    status: "Found",
    image: "https://via.placeholder.com/400x300",
  },
];

const Dashboard = () => {
  return (
    <div className="flex font-[Poppins]">
      {/* Sidebar Merah */}
      <Sidebar />

      {/* Konten Utama */}
      {/* Gunakan min-h-screen untuk memastikan konten utama setidaknya setinggi layar */}
      {/* bg-gray-100 untuk latar belakang, text-gray-900 untuk warna teks default di main */}
      <main className="ml-64 p-10 w-full min-h-screen bg-gray-100 text-gray-900">
        {/* Judul */}
        {/* text-red-600 sudah Anda pakai, ini akan terlihat jelas di bg-gray-100 */}
        <h1 className="text-3xl font-bold text-red-600 mb-8">📦 Barang yang ditemukan</h1>

        {/* Grid Item Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyItems.map((item) => ( // Gunakan item.id sebagai key
            <div
              key={item.id} // Sangat penting menggunakan key unik, bukan index jika urutan item bisa berubah
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                {/* Pastikan warna teks di sini kontras dengan bg-white */}
                <h2 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      item.status === "Found"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;