import React from 'react';
import './header.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';


export const Header = () => {
  return (
    <>
        <div className='Header'>
            <ul>
                <li>
                    <img src={FDMLogo} />
                </li>
                <li><Link to='/Home' className='link'>Home</Link></li>
                <li className='dropdown'>
                    Forum
                    <ul className='dropdown-content'>
                        <li><Link to='/Forum' className='link'>View Posts</Link></li>
                        <li><Link to='/CreatePost' className='link'>Create a Post</Link></li>
                    </ul>
                </li>
                <li className='dropdown'>
                    Account
                    <ul className='dropdown-content'>
                        <li><Link to='/Account' className='link'>Account</Link></li>
                        <li><Link to='/EditAccount' className='link'>Edit Account Info</Link></li>
                    </ul>
                </li>
                <li><Link to='/Contact' className='link'>Contact</Link></li>
                <li><Link to='/Documents' className='link'>Documents</Link></li>
                <li><Link to='/Programs' className='link'>Programs</Link></li>
            </ul>
        </div>
    </>
  );
};

export default Header;