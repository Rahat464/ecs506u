import React from 'react';
import './Contact.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Contact = () => {
  return (
    <>
        <Header />
        <div className='Contact'>
            <h1>this is the contact information</h1>
        </div>
    </>
  );
};

export default Contact;