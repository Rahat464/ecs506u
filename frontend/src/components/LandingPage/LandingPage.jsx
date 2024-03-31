import React from 'react';
import './LandingPage.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';

export const LandingPage = () => {
  return (
    <>
      <Header />
      <div className='Landing'>
        <div className='shadow'></div>
        <form>
          <div className="Logo">
            <img src={FDMLogo} alt="fdm logo"/>
          </div>
          <h1>Welcome to FDM employee portal</h1>

          <div className="register-login">
            <Link to='/SignUp'><button>Sign Up</button></Link>
          </div>
          <div className="register-login">
            <Link to='/LoginForm'><button>Login</button></Link>
          </div>

          <p>An essential hub to access everything you’ll need during your time at FDM</p>
        </form>
      </div>
    </>
  );
};

export default LandingPage;
