import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      id: 'discover', 
      label: 'Discover', 
      path: '/', 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    { 
      id: 'upload', 
      label: 'Upload', 
      path: '/upload', 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      ),
      disabled: true
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      path: '/notifications', 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
        </svg>
      ),
      badge: 2
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      path: '/profile', 
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
        </svg>
      )
    }
  ];

  const moreItems = [
    { label: 'Help & Support', path: '/help' },
    { label: 'Privacy Settings', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'About Us', path: '/about-us' }
  ];

  const handleItemClick = (item) => {
    if (item.disabled) return;
    navigate(item.path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-btn ${location.pathname === item.path ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
            {item.badge && (
              <span className="badge">{item.badge}</span>
            )}
          </button>
        ))}
        
        <div className="sidebar-divider"></div>
        
        <button 
          className="sidebar-btn more-btn"
          onClick={() => setShowMore(!showMore)}
        >
          <span className="icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"/>
            </svg>
          </span>
          <span className="label">More</span>
        </button>
        
        {showMore && (
          <div className="more-dropdown">
            {moreItems.map((item, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;