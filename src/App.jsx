import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import OtherInfo from './components/OtherInfo';
import UploadForm from './components/UploadForm';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/other-info" element={<OtherInfo />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/notifications" element={<div>通知页面</div>} />
          <Route path="/profile" element={<div>个人页面</div>} />
          <Route path="/help" element={<div>帮助页面</div>} />
          <Route path="/privacy" element={<div>隐私设置</div>} />
          <Route path="/terms" element={<div>用户协议</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
