import React from 'react';
import './EditAccount.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const EditAccount = () => {
  return (
    <>
        <Header />
        <div className='EditAccount'>
            <h1>this is where you can edit your account information</h1>
        </div>
    </>
  );
};

export default EditAccount;