
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  List,
  Image as ImageIcon,
  Search,
  Phone,
  Facebook,
  Instagram,
  Mail,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "@fontsource/poppins/700.css"; // Poppins Bold

const dummyLocations = [
  { location_id: 1, name: "Gedung A - Lantai 2", description: "uang bernilai Rp.200.000", created_at: "2025-06-01 08:45:00", image: "public/image/200rb.jpg" },
  { location_id: 2, name: "Perpustakaan Pusat", description: "kunci motor yamaha", created_at: "2025-06-02 10:20:00", image: "public/image/kunci.jpg" },
  { location_id: 3, name: "Kantin Fakultas Teknik", description: "dompet dengan ktp atas nama budi", created_at: "2025-06-03 12:15:00" },
  { location_id: 4, name: "Parkiran Masjid", description: "iphone 11 warna hitam", created_at: "2025-06-03 14:10:00", image: "public/image/hp.jpg" },
  { location_id: 5, name: "Warkop pak sapardi", description: "tas selempang abu-abu", created_at: "2025-06-03 14:10:00" },
  { location_id: 6, name: "lab infor", description: "topi", created_at: "2025-06-04 14:10:00", image: "public/image/topi.jpg" },
  { location_id: 7, name: "gedung rektorat lt.4", description: "uang sejumlah Rp.350.000", created_at: "2025-06-03 14:10:00" },
  { location_id: 8, name: "gedung rektorat", description: "dompet berwarna putih", created_at: "2025-06-07 14:10:00" },
  { location_id: 9, name: "Gedung A - lantai 3", description: "Korek zippo", created_at: "2025-06-12 08:45:00" },
  { location_id: 10, name: "Gedung A - lantai 3", description: "LAptop lenovo thinkpad", created_at: "2025-06-11 08:45:00" },
];

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [viewMode, setViewMode] = useState("photo");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    setLocations(dummyLocations);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
    });
  };

  const normalizeLocationName = (name) => {
    return name.toLowerCase().replace(/\s+/g, " ").replace(/-/g, "").trim();
  };

  const groupedLocations = {};
  dummyLocations.forEach((item) => {
    const normalized = normalizeLocationName(item.name);
    if (!groupedLocations[normalized]) {
      groupedLocations[normalized] = item.name;
    }
  });

  const uniqueLocations = ["Gedung A (semua lantai)", ...Object.values(groupedLocations)];

  const filteredLocations = locations
    .filter((loc) => {
      const normalizedItem = normalizeLocationName(loc.name);
      const normalizedSelected = normalizeLocationName(locationFilter);

      if (locationFilter !== "all") {
        if (
          locationFilter === "Gedung A (semua lantai)" &&
          !loc.name.toLowerCase().includes("gedung a")
        ) {
          return false;
        }
        if (
          locationFilter !== "Gedung A (semua lantai)" &&
          normalizedItem !== normalizedSelected
        ) {
          return false;
        }
      }

      if (
        searchTerm &&
        !(loc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  const handleViewChange = (mode) => {
    if (mode === viewMode) return;
    setTransitioning(true);
    setTimeout(() => {
      setViewMode(mode);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="font-poppins font-bold">
      <header className="bg-red-600 text-white px-4 py-2 shadow font-[Poppins] font-bold">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <span className="text-2xl tracking-tight">Found<span className="text-white">It.</span></span>
    <Link to="" className="text-white hover:underline">MyFoundIt</Link>
  </div>
</header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen bg-[#f2f8fb] py-10 px-4">
        <h1 className="text-2xl text-center mb-6 text-gray-800">Daftar Barang Ditemukan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex gap-2">
            <button onClick={() => handleViewChange("photo")} className={`flex items-center px-3 py-1 rounded ${viewMode === "photo" ? "bg-red-600 text-white" : "bg-white text-gray-700 border"}`}><ImageIcon size={16} className="mr-1" /> Photo </button>
            <button onClick={() => handleViewChange("list")} className={`flex items-center px-3 py-1 rounded ${viewMode === "list" ? "bg-red-600 text-white" : "bg-white text-gray-700 border"}`}><List size={16} className="mr-1" /> List </button>
          </div>

          <div className="flex items-center rounded px-3 py-2 bg-white shadow-sm">
            <Search size={16} className="text-gray-400 mr-2" />
            <input type="text" placeholder="Cari barang atau lokasi..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 text-sm outline-none" />
          </div>

          <div className="flex gap-2">
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-3 py-2 rounded text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-red-500 flex-1">
              <option value="all">Semua Lokasi</option>
              {uniqueLocations.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-3 py-2 rounded text-sm bg-white shadow focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!transitioning && (
            <motion.div key={viewMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={viewMode === "photo" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {filteredLocations.length > 0 ? (
                filteredLocations.map((loc, index) => (
                  <motion.div key={loc.location_id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${viewMode === "list" ? "flex items-center p-4" : "flex flex-col"}`}>
                    <div className={`${viewMode === "list" ? "w-28 h-28 flex-shrink-0 mr-4" : "h-40"} bg-gray-100 flex items-center justify-center rounded`}>
                      {loc.image ? (<img src={loc.image} alt={loc.name} className="object-cover w-full h-full rounded" />) : (<span className="text-gray-400 text-xl text-center">Found<br />It</span>)}
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-red-600 text-base hover:underline mb-1">{loc.description}</h2>
                      <div className="flex items-center text-sm text-gray-600 mb-1"><MapPin size={14} className="mr-1" />{loc.name}</div>
                      <div className="flex items-center text-sm text-gray-500"><Clock size={14} className="mr-1" />{formatDate(loc.created_at)}</div>
                    </div>
                    <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }} className="ml-auto bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition whitespace-nowrap"> Claim item </motion.button>
                  </motion.div>
                ))
              ) : (<p className="text-center text-gray-500 col-span-full">Tidak ada data ditemukan.</p>)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="bg-[#f2f8fb] text-sm text-gray-700 mt-10 border-t">
        <div className="max-w-5xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-800 mb-3">Tentang FoundIt</h4>
            <p className="text-gray-600 leading-relaxed text-justify">
              <strong>FoundIt</strong> adalah platform layanan Lost and Found yang memudahkan pengguna untuk melaporkan dan mencari barang yang hilang maupun ditemukan.
            </p>
          </div>
          <div>
            <h4 className="text-gray-800 mb-3">Kontak Kami</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><Phone size={16} className="mr-2 text-red-600" /> +62 812-3456-7890</li>
              <li className="flex items-center"><Facebook size={16} className="mr-2 text-blue-600" /> <a href="https://facebook.com/foundit" target="_blank" rel="noopener noreferrer">@foundit</a></li>
              <li className="flex items-center"><Instagram size={16} className="mr-2 text-pink-500" /> <a href="https://instagram.com/foundit.id" target="_blank" rel="noopener noreferrer">@foundit.id</a></li>
              <li className="flex items-center"><Mail size={16} className="mr-2 text-red-500" /> <a href="mailto:support@foundit.id">support@foundit.id</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t text-center text-gray-500 py-4 text-xs px-4">
          <p>© 2025 FoundIt. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
