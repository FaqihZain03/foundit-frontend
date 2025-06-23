// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import ClaimDetail from './pages/ClaimDetail';
import '../styles/UserDashboard.css';

function UserDashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('items');
  const [selectedItem, setSelectedItem] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'Selamat Datang!',
      message: 'Terima kasih telah bergabung dengan FoundIt',
      time: '2 menit yang lalu',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Item Ditemukan',
      message: 'Ada item yang cocok dengan pencarian Anda',
      time: '1 jam yang lalu',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Verifikasi Diperlukan',
      message: 'Silakan verifikasi klaim barang Anda',
      time: '3 jam yang lalu',
      read: true
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const handleNavigation = (page, item = null) => {
    setCurrentPage(page);
    if (item) {
      setSelectedItem(item);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'items':
        return <Items onNavigate={handleNavigation} />;
      case 'itemDetail':
        return <ItemDetail item={selectedItem} onNavigate={handleNavigation} />;
      case 'claimDetail':
        return <ClaimDetail item={selectedItem} onNavigate={handleNavigation} />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'reports':
        return <MyReports user={user} />;
      default:
        return <Items onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="user-dashboard">
      {/* Header Navigation */}
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
                className={`nav-btn ${currentPage === 'reports' ? 'active' : ''}`}
                onClick={() => handleNavigation('reports')}
              >
                <i className="bi bi-file-text"></i> Laporan Saya
              </button>
              <button className="nav-btn">
                <i className="bi bi-plus-circle"></i> Laporkan Item
              </button>
            </nav>
          </div>
          
          <div className="header-right">
            {/* Notification Bell */}
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
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`notification-item ${!notif.read ? 'unread' : ''}`}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className={`notification-icon ${notif.type}`}>
                            <i className={`bi bi-${
                              notif.type === 'success' ? 'check-circle' :
                              notif.type === 'warning' ? 'exclamation-triangle' :
                              'info-circle'
                            }`}></i>
                          </div>
                          <div className="notification-content">
                            <h5>{notif.title}</h5>
                            <p>{notif.message}</p>
                            <span className="notification-time">{notif.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="user-details">
                  <span className="user-name">{user?.name || user?.username}</span>
                  <span className="user-role">Mahasiswa</span>
                </div>
              </div>
              <div className="user-dropdown">
                <button 
                  className="dropdown-btn"
                  onClick={() => handleNavigation('profile')}
                >
                  <i className="bi bi-person"></i> Profil
                </button>
                <button className="dropdown-btn">
                  <i className="bi bi-gear"></i> Pengaturan
                </button>
                <button className="dropdown-btn logout-btn" onClick={onLogout}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="main-content">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
}

// User Profile Component
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="bi bi-person-circle"></i>
        </div>
        <div className="profile-info">
          <h2>{user?.name || user?.username}</h2>
          <p>{user?.email}</p>
          <span className="profile-badge">Mahasiswa Aktif</span>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>Informasi Pribadi</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Username:</label>
              <span>{user?.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user?.email}</span>
            </div>
            <div className="info-item">
              <label>Bergabung:</label>
              <span>{new Date(user?.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Aktivitas</h3>
          <div className="activity-stats">
            <div className="activity-item">
              <i className="bi bi-flag"></i>
              <div>
                <span className="activity-number">8</span>
                <span className="activity-label">Item Dilaporkan</span>
              </div>
            </div>
            <div className="activity-item">
              <i className="bi bi-check-circle"></i>
              <div>
                <span className="activity-number">5</span>
                <span className="activity-label">Item Diklaim</span>
              </div>
            </div>
            <div className="activity-item">
              <i className="bi bi-chat"></i>
              <div>
                <span className="activity-number">23</span>
                <span className="activity-label">Komentar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// My Reports Component
function MyReports({ user }) {
  const [reportFilter, setReportFilter] = useState('all');
  
  const myReports = [
    {
      id: 1,
      name: "Dompet Coklat",
      type: "lost",
      status: "active",
      date: "2025-06-20",
      location: "Gedung A - Lantai 2"
    },
    {
      id: 2,
      name: "Kunci Motor",
      type: "found",
      status: "claimed",
      date: "2025-06-19",
      location: "Parkiran Utara"
    }
  ];

  const filteredReports = reportFilter === 'all' 
    ? myReports 
    : myReports.filter(report => report.type === reportFilter);

  return (
    <div className="my-reports">
      <div className="reports-header">
        <h2>Laporan Saya</h2>
        <div className="report-filters">
          <button 
            className={reportFilter === 'all' ? 'active' : ''}
            onClick={() => setReportFilter('all')}
          >
            Semua
          </button>
          <button 
            className={reportFilter === 'lost' ? 'active' : ''}
            onClick={() => setReportFilter('lost')}
          >
            Hilang
          </button>
          <button 
            className={reportFilter === 'found' ? 'active' : ''}
            onClick={() => setReportFilter('found')}
          >
            Ditemukan
          </button>
        </div>
      </div>

      <div className="reports-list">
        {filteredReports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-info">
              <h4>{report.name}</h4>
              <p>{report.location}</p>
              <span className="report-date">{report.date}</span>
            </div>
            <div className="report-badges">
              <span className={`report-type ${report.type}`}>
                {report.type === 'lost' ? 'Hilang' : 'Ditemukan'}
              </span>
              <span className={`report-status ${report.status}`}>
                {report.status === 'active' ? 'Aktif' : 'Diklaim'}
              </span>
            </div>
            <div className="report-actions">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;