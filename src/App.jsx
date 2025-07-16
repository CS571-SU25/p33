import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/other-info" element={<OtherInfo />} />
        <Route path="/upload" element={<UploadForm />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
