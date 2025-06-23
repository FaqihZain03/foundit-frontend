// src/halaman/Users.jsx
import React, { useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaUserCircle } from 'react-icons/fa';

// Data dummy awal untuk pengguna
const initialDummyUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@foundit.com',
    role: 'Admin',
    lastLogin: '2025-06-24 10:00 AM',
  },
  {
    id: 2,
    name: 'Joni',
    email: 'joni@example.com',
    role: 'User',
    lastLogin: '2025-06-23 09:30 AM',
  },
  {
    id: 3,
    name: 'Siti',
    email: 'siti@example.com',
    role: 'User',
    lastLogin: '2025-06-23 01:45 PM',
  },
  {
    id: 4,
    name: 'Budi',
    email: 'budi@example.com',
    role: 'User',
    lastLogin: '2025-06-22 03:00 PM',
  },
  {
    id: 5,
    name: 'Juna',
    email: 'juna@example.com',
    role: 'User',
    lastLogin: '2025-06-22 05:20 PM',
  },
];

const Users = () => {
  const [users, setUsers] = useState(initialDummyUsers);
  const [searchTerm, setSearchTerm] = useState('');

  // Logika filter
  const filteredUsers = users.filter(user => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.role.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Fungsi untuk Hapus Pengguna
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      alert(`User with ID ${id} deleted.`);
    }
  };

  // Fungsi untuk Edit Pengguna
  const handleEdit = (id) => {
    const userToEdit = users.find(user => user.id === id);

    if (userToEdit) {
      const newName = prompt(`Edit Name for User ID ${id}:`, userToEdit.name);
      if (newName === null) return;
      const trimmedName = newName.trim();
      if (trimmedName === '') {
        alert('User name cannot be empty. Edit cancelled.');
        return;
      }

      const newEmail = prompt(`Edit Email for User ID ${id}:`, userToEdit.email);
      if (newEmail === null) return;
      const trimmedEmail = newEmail.trim();

      let newRole = prompt(`Edit Role for User ID ${id}: (Admin, User)`, userToEdit.role);
      if (newRole === null) return;
      newRole = newRole.trim();
      const validRoles = ['Admin', 'User'];
      if (!validRoles.includes(newRole)) {
        alert(`Invalid role. Please choose from: ${validRoles.join(', ')}. Edit cancelled.`);
        return;
      }

      const updatedUsers = users.map(user =>
        user.id === id
          ? {
              ...user,
              name: trimmedName,
              email: trimmedEmail,
              role: newRole,
            }
          : user
      );
      setUsers(updatedUsers);
      alert(`User with ID ${id} updated successfully!`);
    }
  };

  // Fungsi untuk Tambah Pengguna
  const handleAddUser = () => {
    const newUserName = prompt("Enter new user's name:");
    if (newUserName && newUserName.trim() !== "") {
      const newUserEmail = prompt(`Enter email for ${newUserName}:`);
      if (newUserEmail === null || newUserEmail.trim() === "") {
        alert("Email cannot be empty. Add user cancelled.");
        return;
      }
      let newUserRole = prompt(`Enter role for ${newUserName}: (Admin, User)`, "User");
      if (newUserRole === null) return;
      newUserRole = newUserRole.trim();
      const validRoles = ['Admin', 'User'];
      if (!validRoles.includes(newUserRole)) {
        alert(`Invalid role. Please choose from: ${validRoles.join(', ')}. Add user cancelled.`);
        return;
      }

      const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
      const newUser = {
        id: newId,
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        role: newUserRole,
        lastLogin: new Date().toLocaleString(), // Current date and time
      };
      setUsers([...users, newUser]);
      alert(`User '${newUserName}' added!`);
    } else if (newUserName !== null) {
      alert("User name cannot be empty.");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-[Poppins]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center space-x-2
                       hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FaPlus className="w-5 h-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Terakhir Login</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border
                        ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                          'bg-green-100 text-green-800 border-green-300'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                        title="Edit User"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                        title="Delete User"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;