// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navbarStyle = {
    backgroundColor: '#333',
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '20px',
  };

  const ulStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
  };

  const liStyle = {
    marginRight: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
  };

  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}><Link to="/" style={linkStyle}>Home</Link></li>
        <li style={liStyle}><Link to="/login" style={linkStyle}>Login</Link></li>
        <li style={liStyle}><Link to="/register" style={linkStyle}>Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

