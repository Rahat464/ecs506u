// login.jsx
import React from 'react';
import { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const LoginForm = () => {

  // state for the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // handle the call to the backend for logging in
  const handleLogin = (e) => {
    e.preventDefault();

    // call from proxy
    fetch('/api/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "email": email,
          "password": password
        }
      )
    }).then( () => {
      console.log('Logging In.')
    }).catch( () => {
      console.log('Error Logging In.')
    })
  }


  return (
    <>
    <Header />
    <div className='Login'>
      <div className='shadow'> </div>
      <form onSubmit={ handleLogin }>
        <div className="Logo">
              <img src={FDMLogo} alt="fdm logo" />
        </div>
        <h1>Login</h1>
        <p>Sign in to your account</p>
        <div className='input-box'>
            <input 
              type="text" 
              placeholder='Email'
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <FaUser className='icon'/>
        </div>
        <div className='input-box'>
            <input 
              type="password" 
              placeholder='Password'
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <FaLock className='icon' />
        </div>

        <button type="submit">Login</button>

        <div className="forgot-password">
          <a href="#"> Forgot password?</a>
        </div>

        <div className="register-link">
          <Link to='/SignUp'>Sign Up</Link>
        </div>
      </form>
    </div>
    </>
  );
};

export default LoginForm;