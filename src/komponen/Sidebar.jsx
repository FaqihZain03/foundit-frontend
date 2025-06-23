import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Sidebar = () => {
    const navigate = useNavigate(); // Inisialisasi useNavigate

    const handleLogout = () => {
        // Hapus token dan informasi user dari localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");

        // Arahkan user kembali ke halaman login
        navigate("/");
    };

    return (
        // Pastikan kelas-kelas ini ada persis seperti ini
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 shadow-lg fixed left-0 top-0 font-bold font-[Poppins]">
            <div className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
                FoundIt Admin
            </div>
            <nav className="flex flex-col space-y-4">
                <Link to="/Dashboard" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1zm-6 3h12"></path></svg>
                    <span>Dashboard</span>
                </Link>
                {/* Pastikan Link dan SVG untuk Items, Users, Claims, dan Logout juga ada persis seperti ini */}
                <Link to="/admin/items" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    <span>Items</span>
                </Link>
                <Link to="/admin/users" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.278-.341-1.816m1.166-.356C19.167 15.111 20 13.593 20 12c0-3.313-2.687-6-6-6s-6 2.687-6 6c0 1.593.833 3.111 2.012 4.148M12 10a2 2 0 100-4 2 2 0 000 4zm7.961 4.5c.211.014.42.025.629.032v2c-.209.007-.418.018-.629.032M7 20h4v-2c0-.653.122-1.278.341-1.816m-1.166-.356C4.833 15.111 4 13.593 4 12c0-3.313 2.687-6 6-6s6 2.687 6 6c0 1.593-.833 3.111-2.012 4.148"></path></svg>
                    <span>Users</span>
                </Link>
                <Link to="/admin/claims" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Claims</span>
                </Link>
                {/* Tambahkan onClick handler ke tombol logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition duration-200 mt-auto"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-10a3 3 0 013-3h5a3 3 0 013 3v1"></path></svg>
                    <span>Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;