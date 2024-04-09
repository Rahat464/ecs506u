import React, { useContext, useState } from 'react';
import './header.css';
import FDMLogo from '../../assets/FDMLogo.png';
import search from '../../assets/search-icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export const Header = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/SearchResults?query=${searchQuery}`);
  };

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST'
    })
    .then((res) => {
      if (res.status === 200) {
        updateUser(null);
        localStorage.removeItem('user');
        navigate('/Loginform');
      } else {
        throw new Error('Unknown status code returned from the server.');
      }
    });
  };

  return (
    <>
      <div className='Header'>
        <ul>
          <li>
            <Link to='/LandingPage'><img src={FDMLogo} alt="FDM Logo" /></Link>
          </li>
        </ul>

        {user ? (
          <ul>
            <li><Link to='/Home' className='link'>Home</Link></li>
            <li className='dropdown'>
              Forum
              <ul className='dropdown-2elements'>
                <li><Link to='/Forum' className='link'>View Posts</Link></li>
                {user.canpost ? (
                  <li><Link to='/CreatePost' className='link'>Create a Post</Link></li>
                ) : null}
              </ul>
            </li>
            <li><Link to='/Contact' className='link'>Contact</Link></li>
            <li><Link to='/Documents' className='link'>Documents</Link></li>
            <li><Link to='/Programs' className='link'>Programs</Link></li>
            {user.account_type === 'admin' ? (
              <li><Link to='/Admin' className='link'>Admin Dashboard</Link></li>
            ) : null}
            {user.account_type === 'hr' ? (
              <li className='dropdown'>
                HR
                <ul className='dropdown-2elements'>
                  {/* select --> send payslip */}
                  <li><Link to='/SelectEmployeePayslip' className='link'>Send payslip</Link></li> 
                  {/* select --> edit account */}
                  <li><Link to='/SelectEmployee' className='link'>Edit employee account</Link></li>
                </ul>
              </li>
            ) : null}
            <li className='dropdown'>
              Account
              <ul className='dropdown-account'>
                <li><Link to='/Account' className='link'>View Account</Link></li>
                <li><Link to='/EditAccount' className='link'>Edit Account Info</Link></li>
                <li><Link to='/LeaveRequest' className='link'>Request</Link></li>
                <li><Link to='/Issue' className='link'>Issue</Link></li>
              </ul>
            </li>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li>
              <form onSubmit={handleSubmit} className='search-bar'>
                <input
                  type='text'
                  placeholder='Search for employee'
                  className='search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='submit'><img src={search} alt="Search Icon" /></button>
              </form>
            </li>
          </ul>
        ) : (
          <ul>
            <li><Link to='/Loginform' className='link'>Login</Link></li>
            <li><Link to='/Signup' className='link'>Signup</Link></li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Header;
