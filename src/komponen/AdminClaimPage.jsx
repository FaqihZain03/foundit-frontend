// src/halaman/AdminClaimPage.jsx
import React from 'react';

const claimList = [
  {
    id: 1,
    itemName: 'Dompet Hitam',
    description: 'Dompet kulit berisi beberapa kartu penting',
    claimedBy: 'budi.santoso@example.com',
    date: '2025-06-21 09:15:00',
    status: 'Success',
  },
  {
    id: 2,
    itemName: 'iPhone 12',
    description: 'Warna biru, pelindung layar retak',
    claimedBy: 'siti.aminah@example.com',
    date: '2025-06-22 14:30:00',
    status: 'Success',
  },
  {
    id: 3,
    itemName: 'Tas Ransel Hitam',
    description: 'Berisi buku dan botol minum',
    claimedBy: 'agus.pratama@example.com',
    date: '2025-06-23 08:00:00',
    status: 'Success',
  },
  {
    id: 4,
    itemName: 'Kunci Motor',
    description: 'Gantungan Doraemon',
    claimedBy: 'wulan.setiawati@example.com',
    date: '2025-06-23 10:45:00',
    status: 'Success',
  },
  {
    id: 5,
    itemName: 'Jaket Jeans',
    description: 'Ukuran L, ada sobekan kecil di lengan',
    claimedBy: 'rahmat.hidayat@example.com',
    date: '2025-06-23 13:20:00',
    status: 'Success',
  },
  {
    id: 6,
    itemName: 'Earphone Bluetooth',
    description: 'Warna putih, merk Samsung',
    claimedBy: 'nina.rachma@example.com',
    date: '2025-06-23 15:55:00',
    status: 'Success',
  },
  {
    id: 7,
    itemName: 'Kacamata Hitam',
    description: 'Frame tebal, merk Ray-Ban',
    claimedBy: 'eko.susanto@example.com',
    date: '2025-06-23 17:40:00',
    status: 'Success',
  },
];

export default function AdminClaimPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-[Poppins]"> {/* Tambahkan styling konsisten */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Claim List</h1> {/* Sesuaikan heading */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Claimed By</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claimList.map((claim) => (
                <tr key={claim.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{claim.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{claim.itemName}</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-xs">{claim.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{claim.claimedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{claim.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-green-100 text-green-800 border-green-300">
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}