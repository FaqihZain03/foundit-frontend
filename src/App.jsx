import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './halaman/Login';
import Dashboard from './halaman/Dashboard';
import ItemsTable from './halaman/ItemsTable';

import './App.css'; // <--- TAMBAHKAN BARIS INI !!!

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin/items" element={<ItemsTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;