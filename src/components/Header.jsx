import React, { useState } from 'react';
import { Navbar, Nav, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // 实时搜索
    if (onSearch && e.target.value.length > 2) {
      onSearch(e.target.value);
    } else if (onSearch && e.target.value.length === 0) {
      onSearch(''); // 清空搜索
    }
  };

  return (
    <Navbar 
      expand="lg" 
      className="custom-navbar px-4" 
      fixed="top"
      aria-label="Main navigation"
    >
      <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
        VRChat SnapShare
      </Navbar.Brand>
      
      <Navbar.Toggle 
        aria-controls="main-nav" 
        aria-label="Toggle navigation"
        className="navbar-toggle-custom"
      />
      
      <Navbar.Collapse id="main-nav">
        <Nav className="me-auto nav-links-custom">
          <Nav.Link as={Link} to="/" className="nav-link-custom">
            Discover
          </Nav.Link>
          <Nav.Link as={Link} to="/upload" className="nav-link-custom">
            Upload
          </Nav.Link>
          <Nav.Link as={Link} to="/notifications" className="nav-link-custom">
            Notifications
          </Nav.Link>
        </Nav>
        
        <Form className="d-flex search-form-custom mx-auto" onSubmit={handleSearchSubmit}>
          <InputGroup className="search-input-group">
            <Form.Control
              type="text"
              placeholder="Search posts or users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input-custom"
              aria-label="Search posts or users"
            />
            <button type="submit" className="search-btn-custom" aria-label="Submit search">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </InputGroup>
        </Form>
        
        <Nav className="nav-right-custom">
          <Nav.Link href="#" className="nav-link-custom">
            Creator Studio
          </Nav.Link>
          <Nav.Link href="#" className="nav-link-custom">
            Partnerships
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;