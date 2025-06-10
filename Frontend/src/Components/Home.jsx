import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);
 
  // const checkAuth = () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // };
  // checkAuth();
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div className="home-content">
        <h1>Welcome to Your Dashboard</h1>
        <p>You're successfully logged in!</p>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Quick Stats</h3>
            <p>Your activity overview</p>
          </div>
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <p>Your latest actions</p>
          </div>
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Manage your account</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;