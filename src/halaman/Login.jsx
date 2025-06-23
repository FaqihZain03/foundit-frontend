import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State untuk kontrol visualisasi

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "123") {
      setIsLoggingIn(true); // Mulai efek visual

      setTimeout(() => {
        navigate("/Dashboard");
      }, 700); // Durasi disesuaikan, agak diperpanjang untuk animasi spinner (misal 0.7 detik)
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    // Tambahkan `relative` pada div terluar agar overlay bisa di-posisi absolute di dalamnya
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-sky-200 font-bold font-[Poppins] relative overflow-hidden">

      {/* Form Login Anda */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md w-full max-w-sm z-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 rounded focus:outline-none focus:ring focus:ring-sky-500 placeholder:text-gray-400"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-gray-800">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 rounded focus:outline-none focus:ring focus:ring-sky-500 placeholder:text-gray-400"
              placeholder="******"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-sky-500 text-white w-full py-2 rounded-lg hover:bg-sky-600 transition font-semibold focus:outline-none focus:ring focus:ring-sky-500"
            disabled={isLoggingIn} // Nonaktifkan tombol saat animasi berjalan
          >
            {isLoggingIn ? 'Logging In...' : 'Login'} {/* Ubah teks tombol */}
          </button>
        </form>
      </div>

      <div
        className={`
          absolute inset-0 flex items-center justify-center flex-col
          transition-opacity duration-900 ease-in-out z-20
          ${isLoggingIn ? 'opacity-100 visible' : 'opacity-0 invisible'}
          
          bg-gray-100/90     // Latar belakang abu-abu sangat muda semi-transparan
          text-gray-800      // Warna teks gelap untuk kontras
          backdrop-blur-sm   // Efek blur pada apa yang ada di belakang overlay (opsional)
        `}
      >
        {/* Spinner Loading */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-gray-200 mb-4"></div>
        
        {/* Teks Loading */}
        <p className="text-xl font-semibold">Logging in...</p>
      </div>
    </div>
  );
};

export default Login;