import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'


import App from './App.jsx'
import './index.css'
import SignUp from './components/SignUp/SignUp.jsx'
import LoginForm from '../src/components/LoginForm/LoginForm.jsx'
import Home from './components/Home/Home.jsx'
import Forum from './components/Forum/Forum.jsx'
import Account from './components/Account/Account.jsx'
import Contact from './components/Contact/Contact.jsx'
import Documents from './components/Documents/Documents.jsx'
import Programs from './components/Programs/Programs.jsx'
import CreatePost from './components/Forum/CreatePost.jsx'
import EditAccount from './components/Account/EditAccount.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Admin from './components/Admin/Admin.jsx'

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
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/Forum',
    element: <Forum />,
  },
  {
    path: '/Account',
    element: <Account />,
  },
  {
    path: '/Contact',
    element: <Contact />,
  },
  {
    path: '/Documents',
    element: <Documents />,
  },
  {
    path: '/Programs',
    element: <Programs />,
  },
  {
    path: '/CreatePost',
    element: <CreatePost />,
  },
  {
    path: '/EditAccount',
    element: <EditAccount />,
  },
  {
    path: '/LandingPage',
    element: <LandingPage />,
  },
  {
    path: '/Admin',
    element: <Admin />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
