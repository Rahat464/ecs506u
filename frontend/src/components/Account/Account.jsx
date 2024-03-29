import React from 'react';
import './Account.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Account = () => {
  return (
    <>
        <Header />
        <div className='Account'>
            <h1>this is your account information</h1>
        </div>
    </>
  );
};

export default Account;