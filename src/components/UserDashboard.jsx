import React, { useState, useEffect } from 'react';
import Items from './pages/Items';
import ClaimDetail from './pages/ClaimDetail';
import ItemDetail from './pages/ItemDetail';
import ItemForm from './pages/ItemForm';
import CommentPage from './pages/Comment';
import LocationForm from './pages/LocationForm';
import '../styles/UserDashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markNotificationAsRead as markReadAPI,
  deleteNotification,
} from '../_services/notifications';

function UserDashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('items');
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const count = notifications.filter((n) => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const fetchNotifications = async () => {
    try {
      const notifData = await getNotifications();
      setNotifications(notifData || []);
    } catch (error) {
      console.error('Gagal memuat notifikasi', error);
    }
  };

  const handleNavigation = (page, item = null) => {
    setCurrentPage(page);
    if (item) setSelectedItem(item);
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const markNotificationAsRead = async (id) => {
    try {
      await markReadAPI(id);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error('Gagal menandai notifikasi sebagai dibaca', err);
    }
  };

  const clearAllNotifications = async () => {
    try {
      for (const notif of notifications) {
        await deleteNotification(notif.id);
      }
      setNotifications([]);
      setShowNotifications(false);
    } catch (err) {
      console.error('Gagal menghapus notifikasi', err);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'items':
        return <Items onNavigate={handleNavigation} />;
      case 'itemDetail':
        return <ItemDetail item={selectedItem} onNavigate={handleNavigation} />;
      case 'claimDetail':
        return <ClaimDetail item={selectedItem} onNavigate={handleNavigation} />;
      case 'itemForm':
        return <ItemForm user={user} onNavigate={handleNavigation} />;
      case 'comments':
        return <CommentPage onNavigate={handleNavigation} />;
      case 'locationForm':
        return <LocationForm />;
      default:
        return <Items onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="logo">📍 FoundIt</h1>
            <nav className="main-nav">
              <button
                className={`nav-btn ${currentPage === 'items' ? 'active' : ''}`}
                onClick={() => handleNavigation('items')}
              >
                <i className="bi bi-grid"></i> Semua Item
              </button>
              <button
                className={`nav-btn ${currentPage === 'itemForm' ? 'active' : ''}`}
                onClick={() => handleNavigation('itemForm')}
              >
                <i className="bi bi-plus-circle"></i> Laporkan Item
              </button>
              <button
                className={`nav-btn ${currentPage === 'comments' ? 'active' : ''}`}
                onClick={() => handleNavigation('comments')}
              >
                <i className="bi bi-chat-dots"></i> Komentar
              </button>
              <button
                className={`nav-btn ${currentPage === 'locationForm' ? 'active' : ''}`}
                onClick={() => handleNavigation('locationForm')}
              >
                <i className="bi bi-geo-alt"></i> Tambah Lokasi
              </button>
            </nav>
          </div>

          <div className="header-right">
            <div className="notification-container">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bi bi-bell"></i>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifikasi</h4>
                    <button
                      className="clear-btn"
                      onClick={clearAllNotifications}
                    >
                      Hapus Semua
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="no-notifications">
                        <i className="bi bi-bell-slash"></i>
                        <p>Tidak ada notifikasi</p>
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`notification-item ${!notif.read ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className={`notification-icon ${notif.type}`}>
                            <i className={`bi bi-$
                              {notif.type === 'success' ? 'check-circle' :
                              notif.type === 'warning' ? 'exclamation-triangle' :
                              'info-circle'}`}></i>
                          </div>
                          <div className="notification-content">
                            <h5>{notif.title}</h5>
                            <p>{notif.message}</p>
                            <span className="notification-time">
                              {notif.created_at
                                ? new Date(notif.created_at).toLocaleString('id-ID')
                                : ''}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="user-details">
                  <span className="user-name">{user?.name || '-'}</span>
                  <span className="user-role">{user?.role || 'Tidak diketahui'}</span>
                </div>
              </div>
              <div className="user-dropdown">
                <button className="dropdown-btn">
                  <i className="bi bi-gear"></i> Pengaturan
                </button>
                <button
                  className="dropdown-btn logout-btn"
                  onClick={handleLogoutClick}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="main-content">{renderCurrentPage()}</div>
      </main>
    </div>
  );
}

export default UserDashboard;
