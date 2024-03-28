// SignUp.jsx
import React from 'react';
import './SignUp.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';


export const SignUp = () => {
  return (
    
    <div className='wrapper'>
      <div className='shadow'> </div>
      <form action="">
      <div className="Logo">
            <img src={FDMLogo} alt="fdm logo" />
        </div>
        <h1>Sign Up</h1>
        <p>Make a new account</p>
        <div className='input-box'>
            <input type="text" placeholder='Email' required />
            <FaUser className='icon'/>
        </div>
        <div className='Name'>
            <div className='input-name'>
               <input type="text" placeholder='First name' required />

            </div>
            <div className='input-name'>
                <input type="text" placeholder='Last name' required />
            </div>
        </div>
        <div className='input-box'>
            <input type="password" placeholder='Password' required />
            <FaLock className='icon' />
        </div>

        <button type ="submit">Sign Up</button>

        <div className="have-account">
          <a href="#"> Already have an account?</a>
        </div>

        <div className="login-link">
        <Link to='/LoginForm'>Login</Link>
        </div>

    
      </form>
    </div>
  );
};

export default SignUp;