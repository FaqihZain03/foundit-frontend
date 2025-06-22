import React, { useState, useEffect } from 'react';

const dummyItems = [
  {
    item_id: 1,
    name: "Dompet Hitam",
    description: "Dompet berwarna hitam berisi KTP dan kartu ATM",
    location: "Kampus A - Lantai 2",
    date_reported: "2025-05-20",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/fb/13/8c/fb138cc8d1613f88c65b4386977bbe21.jpg",
  },
  {
    item_id: 2,
    name: "Payung Biru",
    description: "Payung lipat warna biru tua",
    location: "Gedung Perpustakaan",
    date_reported: "2025-05-22",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/74/b1/fb/74b1fbc7d279aa4a6ac014f0e45dc32c.jpg",
  },
  {
    item_id: 3,
    name: "Kunci Motor",
    description: "Kunci motor Honda dengan gantungan Marvel",
    location: "Parkiran Timur",
    date_reported: "2025-05-18",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/e4/30/3a/e4303acfd88c789230129e6cf1f3f821.jpg",
  },
  {
    item_id: 4,
    name: "Botol Minum",
    description: "Tumbler hijau merk Lock&Lock",
    location: "Kantin Fakultas Teknik",
    date_reported: "2025-05-21",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/98/9a/63/989a63cbd7852680ba4d13897af520f9.jpg",
  },
  {
    item_id: 5,
    name: "Jaket Hitam",
    description: "Jaket hitam polos aja",
    location: "Ruang Kelas B204",
    date_reported: "2025-05-19",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/54/00/24/540024ef427662f403f64bee4a1e4237.jpg",
  },
  {
    item_id: 6,
    name: "Kacamata",
    description: "Kacamata minus frame coklat gelap",
    location: "Perpustakaan Lantai 1",
    date_reported: "2025-05-20",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/84/e2/0e/84e20ece908f02d2f828ad7ab0de05f7.jpg",
  },
  {
    item_id: 7,
    name: "Flashdisk 32GB",
    description: "Flashdisk warna silver merk Sandisk",
    location: "Lab Komputer 1",
    date_reported: "2025-05-23",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/2c/65/28/2c65285754eb7c8b16db21f1daa85f77.jpg",
  },
  {
    item_id: 8,
    name: "Topi Putih",
    description: "Topi warna putih polos, agak kotor",
    location: "Lapangan Basket",
    date_reported: "2025-05-24",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/f8/f9/b9/f8f9b9ab1952983d5caffb9ae013e918.jpg",
  },
  {
    item_id: 9,
    name: "Buku Catatan",
    description: "Buku catatan tebal dengan sampul warna merah",
    location: "Ruang B101",
    date_reported: "2025-05-22",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/b2/85/84/b2858426560b4bffd405a1ada63937cc.jpg",
  },
  {
    item_id: 10,
    name: "Charger HP",
    description: "Charger warna putih merk Xiaomi",
    location: "Ruang Serbaguna",
    date_reported: "2025-05-23",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/ed/97/d1/ed97d1c9f2b768e36570cfbb0ecd52d9.jpg",
  },
  {
    item_id: 11,
    name: "Handuk Kecil",
    description: "Handuk kecil warna biru muda",
    location: "Kamar Mandi Gedung B",
    date_reported: "2025-05-25",
    status: "Lost",
    image_url: "https://i.pinimg.com/736x/cc/ab/74/ccab74af5a6947b5e187273a3d7971a5.jpg",
  },
  {
    item_id: 12,
    name: "Earphone Hitam",
    description: "Earphone kabel warna hitam merk Sony",
    location: "Halte Depan Kampus",
    date_reported: "2025-05-24",
    status: "Found",
    image_url: "https://i.pinimg.com/736x/d8/cd/1f/d8cd1ff8e41960ac9522b589536c5c10.jpg",
  },
];

export default function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(dummyItems);
  }, []);

  const handleClaim = (item) => {
    alert(`Anda telah mengklaim item: ${item.name}`);
  };

  const handleComment = (item) => {
    alert(`Anda ingin berkomentar pada item: ${item.name}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Barang</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.item_id} className="bg-white rounded-2xl shadow-md p-4">
            <img
              src={item.image_url}
              alt={item.name}
              className="rounded-lg w-full aspect-square object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-sm text-gray-500">📍 {item.location}</p>
            <p className="text-sm text-gray-500">🗓️ {item.date_reported}</p>
            <p className={`mt-2 inline-block px-3 py-1 text-xs rounded-full ${
              item.status === 'Found' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {item.status}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleClaim(item)}
                className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded-xl hover:bg-blue-700"
              >
                Klaim
              </button>
              <button
                onClick={() => handleComment(item)}
                className="bg-gray-200 text-gray-700 px-3 py-1.5 text-sm rounded-xl hover:bg-gray-300"
              >
                Komentar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}