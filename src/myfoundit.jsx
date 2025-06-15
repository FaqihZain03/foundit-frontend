import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function MyFoundIt() {
  const user = {
    name: "jamaludin",
    email: "123",
    phone: "+2231341",
  };

  return (
    <div className="min-h-screen bg-[#f2f8fb] px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border rounded-lg shadow-sm p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Akun Saya
          </h1>

          <div className="space-y-4 text-gray-700 text-base">
            <div>
              <p className="font-medium">Nama</p>
              <p className="text-gray-600">{user.name}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Nomor Telepon</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>

          {/* Tombol edit profil (opsional) */}
          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded transition">
              Edit Profil
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}