import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">VRChat SnapShare</div>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="搜索笔记、用户" 
          />
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
      
      <div className="header-right">
        <a href="#" className="header-link">创作中心</a>
        <a href="#" className="header-link">业务合作</a>
      </div>
    </header>
  );
}

export default Header;