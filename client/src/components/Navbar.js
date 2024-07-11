import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = ({ loggedIn, onLogout }) => {
  const handleLogout = () => {
    // Clear user session/token here (remove from local storage or cookies)
    localStorage.removeItem('token'); // Assuming you stored token in localStorage
    onLogout();
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
