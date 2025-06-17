import { useEffect, useState } from 'react';
import './NavBar.css'; // Assuming you have a CSS file for styling

function NavBar({ email = '', handleLogout }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img src="./src/assets/logoo.jpg" alt="Company Logo" className="navbar-logo" />
                    {/* <span className="brand-name">CORPORATE</span> */}
                </div>
                
                <div className="navbar-right">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button 
                                className="nav-link" 
                                onClick={() => window.location.href = '/home'}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link"
                                onClick={() => window.location.reload()}
                            >
                                Refresh
                            </button>
                        </li>
                    </ul>
                    
                    <div className="user-section">
                        <span className="user-email">{email || 'user@company.com'}</span>
                        <button 
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;