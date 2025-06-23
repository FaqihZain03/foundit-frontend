// src/halaman/Locations.jsx
import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Pastikan FaSearch diimpor juga

// Data dummy awal untuk lokasi
const initialDummyLocations = [
  {
    id: 1,
    name: 'Gedung Rektorat',
    description: 'Pusat administrasi kampus dan kantor rektor.',
  },
  {
    id: 2,
    name: 'Perpustakaan Pusat',
    description: 'Sumber daya buku dan ruang baca utama mahasiswa.',
  },
  {
    id: 3,
    name: 'Kantin Utama',
    description: 'Tempat makan dan berkumpul favorit mahasiswa.',
  },
  {
    id: 4,
    name: 'Laboratorium Komputer',
    description: 'Fasilitas untuk praktikum dan riset komputasi.',
  },
  {
    id: 5,
    name: 'Asrama Putra',
    description: 'Tempat tinggal bagi mahasiswa putra.',
  },
  {
    id: 6,
    name: 'Asrama Putri',
    description: 'Tempat tinggal bagi mahasiswa putri.',
  },
  {
    id: 7,
    name: 'Lapangan Olahraga',
    description: 'Fasilitas untuk berbagai aktivitas olahraga.',
  },
];

const Locations = () => { // Nama komponen diubah menjadi 'Locations' agar sesuai dengan nama file
  const [locations, setLocations] = useState(initialDummyLocations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      location.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      location.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const handleAddLocation = () => {
    const newLocationName = prompt("Enter new location name:");
    if (newLocationName && newLocationName.trim() !== "") {
      const newLocationDescription = prompt(`Enter description for ${newLocationName}:`);
      // Menghitung ID baru (maks ID yang ada + 1)
      const newId = locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1;
      const newLocation = {
        id: newId,
        name: newLocationName.trim(),
        description: newLocationDescription ? newLocationDescription.trim() : 'No description provided.',
      };
      setLocations([...locations, newLocation]);
      alert(`Location '${newLocationName}' added!`);
    } else if (newLocationName !== null) {
      alert("Location name cannot be empty.");
    }
  };

  const handleEditLocation = (id) => {
    const locationToEdit = locations.find(loc => loc.id === id);
    if (locationToEdit) {
      const newName = prompt(`Edit Name for Location ID ${id}:`, locationToEdit.name);
      if (newName === null) return;
      const trimmedName = newName.trim();
      if (trimmedName === '') {
        alert('Location name cannot be empty. Edit cancelled.');
        return;
      }

      const newDescription = prompt(`Edit Description for Location ID ${id}:`, locationToEdit.description);
      if (newDescription === null) return;
      const trimmedDescription = newDescription.trim();

      const updatedLocations = locations.map(loc =>
        loc.id === id
          ? {
              ...loc,
              name: trimmedName,
              description: trimmedDescription,
            }
          : loc
      );
      setLocations(updatedLocations);
      alert(`Location with ID ${id} updated successfully!`);
    }
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const updatedLocations = locations.filter(loc => loc.id !== id);
      setLocations(updatedLocations);
      alert(`Location with ID ${id} deleted.`);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-[Poppins]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Locations Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleAddLocation}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2
                       hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add Location</span>
          </button>
        </div>
      </div>

      {/* Grid untuk Kartu Lokasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <div
              key={location.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-blue-600 mb-3">
                  <FaMapMarkerAlt className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{location.description}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => handleEditLocation(location.id)}
                  className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                  title="Edit Location"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                  title="Delete Location"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg py-10">No locations found.</p>
        )}
      </div>
    </div>
  );
};

export default Locations; // Ekspor komponen dengan nama 'Locations'