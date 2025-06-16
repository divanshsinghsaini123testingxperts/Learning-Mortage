import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router , createBrowserRouter ,RouterProvider } from 'react-router-dom';
import  Home  from './Pages/Home/Home.jsx'
import  Login  from './Pages/Authentication/Login.jsx'
import  Register  from './Pages/Authentication/Register.jsx'
import ForgotPassword from './Pages/Authentication/ForgotPassword.js'
import NewPass from './Pages/Authentication/NewPass.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Just landing page with login/register buttons
    errorElement: <div>Page not found</div>,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />,
  
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'Customers',
        element: <Customers />
      },
      {
        path: 'Custom_forms',
        element: <CustomForms />
      },
      {
        path: 'Create_custom_form',
        element: <CreateCustomForm />
      },
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
