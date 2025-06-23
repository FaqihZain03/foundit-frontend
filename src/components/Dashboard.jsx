import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate(); // tambahkan ini

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="main-dashboard">
      {/* Navigation Header */}
      <nav className="main-navbar">
        <div className="navbar-brand">
          <h1>📍 FoundIt</h1>
        </div>
        <div className="navbar-menu">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">
            <i className="bi bi-house-door"></i> Home
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="nav-link">
            <i className="bi bi-info-circle"></i> Tentang
          </a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} className="nav-link">
            <i className="bi bi-gear"></i> Fitur
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="nav-link">
            <i className="bi bi-envelope"></i> Kontak
          </a>
        </div>
        <button onClick={() => navigate('/login')} className="login-btn">
          <i className="bi bi-box-arrow-in-right"></i> Login
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Temukan Barang Hilang Anda di Kampus</h1>
          <p className="hero-subtitle">
            Platform terpercaya untuk melaporkan dan mencari barang hilang di lingkungan kampus.
            Bergabunglah dengan komunitas yang peduli sesama mahasiswa.
          </p>
          <div className="hero-buttons">
          <button onClick={() => navigate('/login')} className="btn-primary">
              <i className="bi bi-search"></i> Mulai Pencarian
            </button>
            <button onClick={() => scrollToSection('about')} className="btn-secondary">
              <i className="bi bi-info-circle"></i> Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <h3>150+</h3>
            <p>Barang Ditemukan</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Pengguna Aktif</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Tingkat Keberhasilan</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <h2>Tentang FoundIt</h2>
            <p>Solusi modern untuk masalah barang hilang di kampus</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Mengapa Memilih Kami?</h3>
              <p>
                FoundIt adalah platform digital yang dirancang khusus untuk membantu 
                mahasiswa dan civitas akademika dalam melaporkan dan mencari barang hilang 
                di lingkungan kampus. Dengan sistem yang mudah digunakan dan komunitas yang 
                aktif, kami berkomitmen untuk mengembalikan barang-barang berharga kepada pemiliknya.
              </p>
              <ul className="feature-list">
                <li><i className="bi bi-check-circle-fill"></i> Sistem pelaporan yang mudah dan cepat</li>
                <li><i className="bi bi-check-circle-fill"></i> Notifikasi real-time untuk pencocokan barang</li>
                <li><i className="bi bi-check-circle-fill"></i> Verifikasi keamanan untuk melindungi data</li>
                <li><i className="bi bi-check-circle-fill"></i> Komunitas yang peduli dan saling membantu</li>
              </ul>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <i className="bi bi-people-fill"></i>
                <p>Komunitas Kampus Yang Peduli</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Fitur Unggulan</h2>
            <p>Temukan berbagai fitur yang memudahkan Anda</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-search"></i>
              </div>
              <h3>Pencarian Cerdas</h3>
              <p>Sistem pencarian dengan filter kategori, lokasi, dan waktu untuk hasil yang akurat</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-flag-fill"></i>
              </div>
              <h3>Laporan Mudah</h3>
              <p>Interface sederhana untuk melaporkan barang hilang atau ditemukan dengan foto</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-bell-fill"></i>
              </div>
              <h3>Notifikasi Real-time</h3>
              <p>Dapatkan pemberitahuan langsung ketika ada kecocokan barang yang Anda cari</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Verifikasi Aman</h3>
              <p>Sistem verifikasi kepemilikan untuk memastikan barang kembali ke pemilik yang benar</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <h3>Peta Lokasi</h3>
              <p>Visualisasi lokasi penemuan dan kehilangan barang dalam peta kampus</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="bi bi-chat-dots-fill"></i>
              </div>
              <h3>Chat Langsung</h3>
              <p>Komunikasi langsung antara penemu dan pemilik barang melalui chat terintegrasi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>Hubungi Kami</h2>
            <p>Ada pertanyaan? Kami siap membantu Anda</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="bi bi-geo-alt-fill"></i>
                <div>
                  <h4>Alamat</h4>
                  <p>Gedung Rektorat, Lantai 2<br />Universitas ABC, Jakarta</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone-fill"></i>
                <div>
                  <h4>Telepon</h4>
                  <p>+62 21 1234 5678</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <h4>Email</h4>
                  <p>support@foundit.ac.id</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Nama Lengkap" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Pesan Anda" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  <i className="bi bi-send"></i> Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>📍 FoundIt</h3>
              <p>Menghubungkan kembali Anda dengan barang-barang berharga</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Tentang</a></li>
                <li><a href="#features">Fitur</a></li>
                <li><a href="#contact">Kontak</a></li>
              </ul>
            </div>
            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 FoundIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;