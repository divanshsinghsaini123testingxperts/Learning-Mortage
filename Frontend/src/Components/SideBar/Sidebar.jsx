


import { NavLink  , Link} from "react-router-dom"

function Sidebar() {
  return (
    <>
     <h2>Dashboard</h2>
     <ul>
        <li className="button"><NavLink to="/home/Customers">Customers</NavLink></li>
        <li className="button"><NavLink to="/home/Custom_forms">Custom Forms</NavLink></li>
     </ul>

     </>
  )
}

export default Sidebar


