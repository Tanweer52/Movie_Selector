import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Welcome to Movie Selector</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>Please choose an option:</p>
      <Link to="/login">
        <button style={buttonStyle}>Login</button>
      </Link>
      <Link to="/register">
        <button style={buttonStyle}>Register</button>
      </Link>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  marginRight: '10px',
};

export default LandingPage;