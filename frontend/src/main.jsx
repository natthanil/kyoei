import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './index/index.jsx'
import './main.css'
import Staff from './staff/staff.jsx'
import Login from './login/login.jsx'
import Logout from './logout/logout.jsx'
import Register from './register/register.jsx'
const router = createBrowserRouter([{
  path : '/',
  element : <Login/>
},
{
  path : '/index',
  element : <Index />
},
{
  path : '/staff',
  element : <Staff />
},{
  path : '/logout',
  element :<Logout/>
},{
  path : '/register',
  element : <Register />
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
