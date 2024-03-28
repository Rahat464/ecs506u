import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import SignUp from './components/SignUp/SignUp.jsx'
import LoginForm from '../src/components/LoginForm/LoginForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 not found</div>,
  },
  {
    path: '/SignUp',
    element: <SignUp />,
  },
  {
    path: '/LoginForm',
    element: <LoginForm />,
  },
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
