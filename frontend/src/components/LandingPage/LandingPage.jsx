import React from 'react';
import './LandingPage.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const LandingPage = () => {
  return (
    <>
        <Header />
        <div className='LandingPage'>
            <h1>this is the landing page (wip)</h1>
            <ul>
                <li><Link to = '/LoginForm'>Login</Link></li>
                <li><Link to = '/SignUp'>Sign Up</Link></li>
            </ul>
        </div>
    </>
  );
};

export default LandingPage;