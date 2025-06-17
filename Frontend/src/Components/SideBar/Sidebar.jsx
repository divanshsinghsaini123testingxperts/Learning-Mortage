import { NavLink } from "react-router-dom";
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/home" 
              end
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/home/Custom_forms"
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Custom Forms
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;