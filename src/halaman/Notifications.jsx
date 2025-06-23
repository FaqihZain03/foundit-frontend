// src/halaman/Notifications.jsx
import React, { useState } from 'react';
import { FaBell, FaCheckCircle, FaTrash, FaSearch } from 'react-icons/fa'; // Pastikan ikon-ikon ini diimpor

const initialDummyNotifications = [
  {
    id: 1,
    title: 'Item Baru Ditemukan',
    message: 'Sebuah dompet hitam baru saja dilaporkan ditemukan di area kantin.',
    timestamp: '2025-06-23 10:30 AM',
    read: false,
  },
  {
    id: 2,
    title: 'Klaim Item Diterima',
    message: 'Klaim untuk "Laptop HP" oleh pengguna Budi telah diterima.',
    timestamp: '2025-06-22 09:15 AM',
    read: true,
  },
  {
    id: 3,
    title: 'Pengguna Baru Terdaftar',
    message: 'Pengguna baru dengan nama "Rina" telah mendaftar di sistem.',
    timestamp: '2025-06-22 08:00 AM',
    read: false,
  },
  {
    id: 4,
    title: 'Lokasi Baru Ditambahkan',
    message: 'Lokasi "Area Parkir Depan" telah ditambahkan ke daftar lokasi.',
    timestamp: '2025-06-21 04:00 PM',
    read: true,
  },
  {
    id: 5,
    title: 'Reminder: Verifikasi Item',
    message: 'Ada 2 item yang memerlukan verifikasi status.',
    timestamp: '2025-06-20 11:00 AM',
    read: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialDummyNotifications);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(notification => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      notification.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.message.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.timestamp.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    );
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      const updatedNotifications = notifications.filter(notif => notif.id !== id);
      setNotifications(updatedNotifications);
      alert(`Notification deleted.`);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-[Poppins]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications Center</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Daftar Notifikasi */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`flex items-start p-5 rounded-lg shadow-md border
                ${notification.read ? 'bg-gray-200 border-gray-300' : 'bg-white border-blue-200'}`}
            >
              <FaBell className={`w-6 h-6 mr-4 ${notification.read ? 'text-gray-500' : 'text-blue-600'}`} />
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                  {notification.title}
                </h3>
                <p className={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className={`p-2 rounded-full transition-colors duration-200
                    ${notification.read
                      ? 'text-green-600 hover:bg-green-100'
                      : 'text-gray-500 hover:text-green-600 hover:bg-green-100'}`}
                  title={notification.read ? "Mark as Unread" : "Mark as Read"}
                >
                  <FaCheckCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteNotification(notification.id)}
                  className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                  title="Delete Notification"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg py-10">No notifications found.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;