// src/halaman/ItemsTable.jsx
import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// Data dummy awal. Ini akan menjadi nilai awal state `items`.
const initialDummyItems = [
  {
    id: 1,
    name: 'dompet hitam',
    description: 'hilang dekat parkiran masjid',
    status: 'Lost',
    user: 'joni',
    location: 'masjid utama',
    dateReported: '2025-06-15',
  },
  {
    id: 2,
    name: 'payung merah',
    description: 'ditemukan di ruang kelas 101 gedung teknik',
    status: 'Found',
    user: 'Juna',
    location: 'Gedung fakultas teknik',
    dateReported: '2025-06-16',
  },
  {
    id: 3,
    name: 'Backpack biru',
    description: 'ditemukan di samping lapangan voli',
    status: 'Claimed',
    user: 'doni',
    location: 'belakang asrama',
    dateReported: '2025-06-17',
  },
  {
    id: 4,
    name: 'Kunci Motor',
    description: 'Ditemukan di kantin kampus',
    status: 'Found',
    user: 'Siti',
    location: 'Kantin Utama',
    dateReported: '2025-06-18',
  },
  {
    id: 5,
    name: 'Buku Catatan',
    description: 'Tertinggal di perpustakaan lantai 2',
    status: 'Lost',
    user: 'Budi',
    location: 'Perpustakaan',
    dateReported: '2025-06-19',
  },
];

const ItemsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Gunakan useState untuk mengelola daftar item
  const [items, setItems] = useState(initialDummyItems);

  // Logika filter: Ini akan menghitung ulang `filteredItems` setiap kali `searchTerm` atau `items` berubah
  const filteredItems = items.filter(item => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.user.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.location.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.dateReported.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Fungsi untuk Hapus Item
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      alert(`Item with ID ${id} deleted.`);
    }
  };

  // Fungsi untuk Edit Item (dengan multiple prompts)
  const handleEdit = (id) => {
    const itemToEdit = items.find(item => item.id === id);

    if (itemToEdit) {
      // 1. Edit Nama
      const newName = prompt(`Edit Name for Item ID ${id}:`, itemToEdit.name);
      if (newName === null) return; // Pengguna menekan Cancel
      const trimmedName = newName.trim();
      if (trimmedName === '') {
        alert('Item name cannot be empty. Edit cancelled.');
        return;
      }

      // 2. Edit Deskripsi
      const newDescription = prompt(`Edit Description for Item ID ${id}:`, itemToEdit.description);
      if (newDescription === null) return; // Pengguna menekan Cancel
      const trimmedDescription = newDescription.trim();

      // 3. Edit Status (menggunakan pilihan terbatas)
      let newStatus = prompt(
        `Edit Status for Item ID ${id}: (Lost, Found, Claimed)`,
        itemToEdit.status
      );
      if (newStatus === null) return; // Pengguna menekan Cancel
      newStatus = newStatus.trim();
      const validStatuses = ['Lost', 'Found', 'Claimed'];
      if (!validStatuses.includes(newStatus)) {
        alert(`Invalid status. Please choose from: ${validStatuses.join(', ')}. Edit cancelled.`);
        return;
      }

      // 4. Edit Lokasi
      const newLocation = prompt(`Edit Location for Item ID ${id}:`, itemToEdit.location);
      if (newLocation === null) return; // Pengguna menekan Cancel
      const trimmedLocation = newLocation.trim();

      const updatedItems = items.map(item =>
        item.id === id
          ? {
              ...item,
              name: trimmedName, 
              description: trimmedDescription, 
              status: newStatus,            
              location: trimmedLocation,     
            }
          : item 
      );
      setItems(updatedItems); // Update state `items` untuk memicu re-render
      alert(`Item with ID ${id} updated successfully!`);
    }
  };

  // Fungsi untuk Tambah Item
  const handleAddItem = () => {
    const newItemName = prompt("Enter new item name:");
    if (newItemName && newItemName.trim() !== "") {
      // Menghitung ID baru (maks ID yang ada + 1)
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      const newItem = {
        id: newId,
        name: newItemName.trim(),
        description: "New item description", // Default description
        status: "Found", // Default status
        user: "Admin", // Default user
        location: "Unknown", // Default location
        dateReported: new Date().toISOString().slice(0, 10), // Current date (YYYY-MM-DD)
      };
      setItems([...items, newItem]); // Tambahkan item baru ke state
      alert(`Item '${newItemName}' added!`);
    } else if (newItemName !== null) { // Jika prompt tidak null tapi nama kosong
      alert("Item name cannot be empty.");
    }
  };


  return (
    <div className="p-8 bg-gray-100 min-h-screen font-[Poppins]">
      {/* Header Halaman dengan Search DAN Tombol Tambah Item */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Items</h1>
        {/* Container untuk search dan tombol Add Item */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {/* Tombol Tambah Item */}
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2
                       hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Kontainer Tabel */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal Dilaporkan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Gunakan filteredItems di sini */}
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  {/* Pastikan ini menampilkan properti yang benar dari `item` */}
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-xs">{item.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border
                      ${item.status === 'Lost' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        item.status === 'Found' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        'bg-green-100 text-green-800 border-green-300'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.dateReported}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {/* Tombol Edit */}
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    {/* Tombol Delete */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {/* Kondisi untuk "No matching items found." juga menggunakan filteredItems */}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No matching items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;