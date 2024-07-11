import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetails';
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {!isAuthenticated && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li><Link to="/movies">Movies</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to Movie App</h1>} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/movies" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/movies" /> : <Register />} />
          <Route path="/movies" element={isAuthenticated ? <MovieList onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/movie/:id" element={isAuthenticated ? <MovieDetail /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
