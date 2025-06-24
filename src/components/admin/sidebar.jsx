import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = ({ setSelectedMenu }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                FoundIt Admin
            </div>
            <nav className="sidebar-nav">
                <button onClick={() => setSelectedMenu("dashboard")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1H9a1 1 0 00-1 1v4a1 1 0 001 1zm-6 3h12" />
                    </svg>
                    <span>Dashboard</span>
                </button>
                <button onClick={() => setSelectedMenu("items")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span>Items</span>
                </button>
                <button onClick={() => setSelectedMenu("users")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.278-.341-1.816m1.166-.356C19.167 15.111 20 13.593 20 12c0-3.313-2.687-6-6-6s-6 2.687-6 6c0 1.593.833 3.111 2.012 4.148M12 10a2 2 0 100-4 2 2 0 000 4zm7.961 4.5c.211.014.42.025.629.032v2c-.209.007-.418.018-.629.032M7 20h4v-2c0-.653.122-1.278.341-1.816m-1.166-.356C4.833 15.111 4 13.593 4 12c0-3.313 2.687-6 6-6s6 2.687 6 6c0 1.593-.833 3.111-2.012 4.148" />
                    </svg>
                    <span>Users</span>
                </button>
                <button onClick={() => setSelectedMenu("locations")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.278-.341-1.816m1.166-.356C19.167 15.111 20 13.593 20 12c0-3.313-2.687-6-6-6s-6 2.687-6 6c0 1.593.833 3.111 2.012 4.148M12 10a2 2 0 100-4 2 2 0 000 4zm7.961 4.5c.211.014.42.025.629.032v2c-.209.007-.418.018-.629.032M7 20h4v-2c0-.653.122-1.278.341-1.816m-1.166-.356C4.833 15.111 4 13.593 4 12c0-3.313 2.687-6 6-6s6 2.687 6 6c0 1.593-.833 3.111-2.012 4.148" />
                    </svg>
                    <span>Locations</span>
                </button>
                <button onClick={() => setSelectedMenu("claims")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Claims</span>
                </button>
                <button onClick={() => setSelectedMenu("comments")} className="sidebar-link">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Comments</span>
                </button>
                <button onClick={handleLogout} className="sidebar-link logout">
                    <svg className="sidebar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3v-10a3 3 0 013-3h5a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
