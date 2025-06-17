import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import Sidebar from '../../Components/SideBar/Sidebar';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="home-layout">
      <header className="home-navbar">
        <NavBar handleLogout={handleLogout} Email={localStorage.getItem('email') || 'Guest'} />
      </header>
      <div className="home-content">
        
        <aside className="home-sidebar">
          <Sidebar />
        </aside>
        <div className="home-main">
          <Outlet />
        </div>
      </div>
      
    </div>
  );
}

export default Home;