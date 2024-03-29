// login.jsx
import React from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const LoginForm = () => {
  return (
    <>
    <Header />
    <div className='Login'>
      <div className='shadow'> </div>
      <form action="">
      <div className="Logo">
            <img src={FDMLogo} alt="fdm logo" />
        </div>
        <h1>Login</h1>
        <p>Sign in to your account</p>
        <div className='input-box'>
            <input type="text" placeholder='Email' required />
            <FaUser className='icon'/>
        </div>
        <div className='input-box'>
            <input type="password" placeholder='Password' required />
            <FaLock className='icon' />
        </div>

        <button type ="submit">Login</button>

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