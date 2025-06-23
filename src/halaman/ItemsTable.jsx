import React from 'react';

const dummyItems = [
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
];

const ItemsTable = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Items</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Deskripsi</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Lokasi</th>
              <th className="px-4 py-2 text-left">Tanggal dilaporkan</th>
              <th className="px-4 py-2 text-left">actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyItems.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${item.status === 'Lost' ? 'bg-yellow-100 text-yellow-800' : 
                      item.status === 'Found' ? 'bg-blue-100 text-blue-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2">{item.user}</td>
                <td className="px-4 py-2">{item.location}</td>
                <td className="px-4 py-2">{item.dateReported}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                    Delete
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

export default ItemsTable;