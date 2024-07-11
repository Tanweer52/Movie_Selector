import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import "./Register.css";
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false); // State to track registration success

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill out both username and password fields.');
      return;
    }

    // Additional validation for username (e.g., length, characters)
    if (username.length < 4 || username.length > 20) {
      setError('Username must be between 4 and 20 characters.');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    }

    // Additional validation for password (e.g., length, complexity)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });

      console.log('Registration successful:', response.data);
      setRegistered(true); // Set registration success flag
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        if (error.response.status === 409) {
          setError('Username already exists. Please choose a different username.');
        } else {
          setError('Registration failed. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Unexpected error occurred. Please try again later.');
      }
    }
  };

  // Redirect to login page upon successful registration
  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="register-form">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
