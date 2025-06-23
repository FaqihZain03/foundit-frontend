import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123") {
      localStorage.setItem("accessToken", "dummy_admin_token");
      localStorage.setItem("userInfo", JSON.stringify({ email: "admin@gmail.com", role: "admin" }));
      navigate("/Dashboard");
    } else {
      alert("Email atau password salah");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-bold font-[Poppins]">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-white" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-400"
              placeholder="admin@example.com"
              required
            />
          </div>
          {/* Div ini tetap ada untuk margin bawah antara field */}
          <div className="mb-6">
            <label className="block mb-1 text-white" htmlFor="password">Password</label>
            {/* --- DIV BARU INI ADALAH KUNCI UNTUK POSISI YANG AKURAT --- */}
            <div className="relative"> 
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500 placeholder:text-gray-400 pr-10" 
                placeholder="******"
                required
              />
              <button
                type="button" 
                onClick={togglePasswordVisibility}
                // Kelas posisi sekarang relatif terhadap div 'relative' yang baru
                className="absolute right-0 top-1/2 -translate-y-1/2 // Posisi tepat di tengah vertikal dan kanan
                           flex items-center justify-center // Pusatkan ikon di dalam tombol
                           px-3 py-2 // Mengatur tinggi tombol dengan padding vertikal (serasi dengan input)
                           text-gray-400 // Warna ikon
                           bg-transparent // Latar belakang tombol transparan
                           focus:outline-none // Hapus outline default browser
                           focus:ring-0 // Hapus efek ring saat fokus
                           focus:border-transparent // Hapus border saat fokus
                           " 
              >
                {/* SVG Icons */}
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .982-2.733 3.013-4.839 5.253-6.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v1m8.053-1.053A9.97 9.97 0 0121.542 12c-1.274 4.057-5.064 7-9.542 7-1.768 0-3.467-.341-5.053-.984M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div> 
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white w-full py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;