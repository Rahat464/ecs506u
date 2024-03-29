import React from 'react';
import './header.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';


export const Header = () => {
  return (
    
    <div className='Header'>
      <ul>
        <li>
            <img src={FDMLogo} />
        </li>
        <li>Home</li>
        <li>Forum</li>
        <li>Account</li>
        <li>Contant</li>
        <li>Documents</li>
        <li>Programs</li>
      </ul>
    </div>
  );
};

export default Header;