import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CategoryNav from './CategoryNav';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <CategoryNav />
      <div className="layout-body">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;