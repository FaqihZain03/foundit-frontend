// src/halaman/Dashboard.jsx
import React from "react";
// HANYA impor ikon yang relevan untuk KONTEN Dashboard ini
import { FaBoxes, FaCheckCircle, FaSearch } from 'react-icons/fa';
// HAPUS IMPOR LAINNYA seperti Sidebar, Link, useNavigate, FaUserCircle, FaBell, FaSignOutAlt

const dummyItems = [
  {
    id: 1,
    name: "Backpack hitam",
    description: "Ditemukan dekat parkiran fakultas feb",
    status: "Found",
    image: "/img/backpack.png",
  },
  {
    id: 2,
    name: "Payung merah",
    description: "Ditemukan ibu kantin di kantin bu jamilah",
    status: "Claimed",
    image: "/img/payung.png",
  },
  {
    id: 3,
    name: "Laptop Hp",
    description: "Ditemukan di labtek",
    status: "Found",
    image: "/img/laptop.png",
  },
  {
    id: 4,
    name: "Smartphone Samsung",
    description: "Ditemukan di perpustakaan",
    status: "Found",
    image: "/img/hp.png",
  },
  {
    id: 5,
    name: "Buku Catatan",
    description: "Ditemukan di ruang kelas 201",
    status: "Claimed",
    image: "/img/bukucatatan.png",
  },
];

const Dashboard = () => {
  // HAPUS navigate dan handleLogout dari sini, karena logout ada di Navbar
  // const navigate = useNavigate();
  // const handleLogout = () => { navigate('/'); };

  const totalItems = dummyItems.length;
  const foundItems = dummyItems.filter(item => item.status === "Found").length;
  const claimedItems = dummyItems.filter(item => item.status === "Claimed").length;

  return (
    // DIV TERLUAR INI HANYA UNTUK KONTEN DASHBOARD.
    // HAPUS flex, min-h-screen, ml-64, dan tag <main> di sini.
    // Padding sudah diatur oleh AdminLayout.jsx
    <div className="bg-gray-100 text-gray-900 min-h-full p-8"> {/* p-8 untuk padding dari AdminLayout */}
      {/* HAPUS HEADER DARI SINI, KARENA SUDAH ADA DI NAVBAR */}
      {/* <header className="bg-white p-6 shadow-md flex justify-between items-center"> ... </header> */}

      {/* Bagian Statistik Ringkasan */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition duration-300 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">Total Items</h3>
            <p className="text-4xl font-bold text-blue-600">{totalItems}</p>
          </div>
          <FaBoxes className="text-5xl text-blue-400 opacity-30" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition duration-300 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">Items Found</h3>
            <p className="text-4xl font-bold text-green-600">{foundItems}</p>
          </div>
          <FaSearch className="text-5xl text-green-400 opacity-30" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition duration-300 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-1">Items Claimed</h3>
            <p className="text-4xl font-bold text-yellow-600">{claimedItems}</p>
          </div>
          <FaCheckCircle className="text-5xl text-yellow-400 opacity-30" />
        </div>
      </section>

      <h1 className="text-3xl font-bold text-red-600 mb-8">📦 Barang yang Ditemukan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {dummyItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm mb-3 h-12 overflow-hidden">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-sm font-semibold px-4 py-1 rounded-full ${
                    item.status === "Found"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  }`}
                >
                  {item.status}
                </span>
                <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  View Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} FoundIt Admin. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Dashboard;