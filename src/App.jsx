import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import UploadForm from './components/UploadForm';
import NotificationsPage from './components/NotificationsPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <HashRouter>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/other-info" element={<OtherInfo />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/help" element={<div>Help & Support</div>} />
          <Route path="/privacy" element={<div>Privacy Settings</div>} />
          <Route path="/terms" element={<div>Terms of Service</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
