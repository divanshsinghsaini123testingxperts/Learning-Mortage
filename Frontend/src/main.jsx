import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router , createBrowserRouter ,RouterProvider } from 'react-router-dom';
import ForgotPassword from './Pages/Authentication/ForgotPassword.jsx'
import  Home  from './Pages/Home/Home.jsx'
import  Login  from './Pages/Authentication/Login.jsx'
import  Register  from './Pages/Authentication/Register.jsx'
import NewPass from './Pages/Authentication/NewPass.jsx'
import Customers from './Components/Customers/Customers.jsx'
import CustomForms from './Components/CustomForms/CustomForms.jsx'
import CreateCustomForm from './Components/CreateCustomForm/CreateCustomForm.jsx'
import AddCustomer from './Components/Customers/AddCustomer.jsx'
import EditCustomer from './Components/Customers/EditCustomer.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Just landing page with login/register buttons
    errorElement: <div>Page not found</div>,
  },
  {
    path: '/login',
    element: <Login />,
    
    errorElement: <div>Login failed</div>, // Optional error element for login

  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <div>Registration failed</div>, // Optional error element for registration
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <div>Forgot password failed</div>, // Optional error element for forgot password
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Customers />,
        errorElement: <div>Failed to load customers</div>
      },
      {
        path: 'Custom_forms',
        element: <CustomForms />,
        errorElement: <div>Failed to load custom forms</div>
      },
      {
        path: 'Create_custom_form',
        element: <CreateCustomForm />,
        errorElement: <div>Failed to create custom form</div>
      },
      {
        path: 'Add_customer',
        element: <AddCustomer />,
        errorElement: <div>Failed to add customer</div>
      },
      {
        path: 'Edit_customer',
        element: <EditCustomer />,
        errorElement: <div>Failed to edit customer</div>
      }
    ],
  },
  {
    path: '/new-password',
    element: <NewPass />
  }
  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
