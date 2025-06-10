import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Router , createBrowserRouter ,RouterProvider } from 'react-router-dom';
import  Home  from './Components/Home.jsx'
import  Login  from './Components/Login.jsx'
import  Register  from './Components/Register.jsx'
import ForgotPassword from './Components/ForgotPassword.jsx'
import NewPass from './Components/NewPass.jsx'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <div>Page not found</div>,
//     children: [
//       {
//         path: 'home',
//         element: <Home />
//       },
//       {
//         path: 'login',   // ✅ lowercase and not nested
//         element: <Login />
//       },
//       {
//         path: 'register',  // ✅ lowercase and not nested
//         element: <Register />
//       },
//       {
//         path: 'forgot-password',  // ✅ separate page, not nested under login
//         element: <ForgotPassword />
//       }
//     ]
//   }
// ]);
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
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/home',
    element: <Home />
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
