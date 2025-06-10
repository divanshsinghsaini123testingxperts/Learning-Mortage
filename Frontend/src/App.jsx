import { useState } from 'react';
import './App.css';
import { Link, Navigate, Outlet } from 'react-router-dom';

function App() {
  const [Token, setToken] = useState(localStorage.getItem('token') || null);

  if (Token) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="auth-container">
      <h1 className="welcome-text">Welcome to Our App</h1>
      <p className="subtitle">Please login or register to continue your journey with us</p>

      <div className="buttons-wrapper">
        <button className="button">
          <Link to="/login">Login</Link>
        </button>
        <button className="button">
          <Link to="/register">Register</Link>
        </button>
      </div>

      {/* Important: Render child components like Login/Register here */}
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
