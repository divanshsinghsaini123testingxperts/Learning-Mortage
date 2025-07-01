import { NavLink } from "react-router-dom";
import './Sidebar.css';
import { useParams } from "react-router-dom";
function Sidebar() {
  const { Id } = useParams();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to={`/home/${Id}`}
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
              to={`/home/${Id}/Custom_forms`}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Custom Forms
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/home/${Id}/View_forms`}
              end
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              New Submission
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;