import './Account.css';
import Header from '../header/header';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

export const Account = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Function to fetch updated user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/userProfile'); //endpoint fetches user profile
      if (response.ok) {
        const userData = await response.json();
        updateUser(userData); // Update user context or state with the new data
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error 
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    if (!user) {
      navigate('/Loginform');
    } else {
      fetchUserData();
    }
  }, [user, navigate, updateUser]);

  return (
    <>
      <div>
        <Header />
      </div>

      <div className='wrapper'>
        <div className='Account-header'>
          <h1>Personal information</h1>
        </div>

        <div className='info'>
          <div className='personal-info'>
            <h1 className='title'>First name</h1>
            <div className='fname'>{user && <p>{user.firstname}</p>}</div>
            <h1 className='title'>Last name</h1>
            <div className='lname'>{user && <p>{user.lastname}</p>}</div>
            <h1 className='title'>Number</h1>
            <div className='number'>{user && <p>{user.phone}</p>}</div>
            <h1 className='title'>Email</h1>
            <div className='email'>{user && <p>{user.email}</p>}</div>
            <div>
              <Link to='/EditAccount'>
                <button>Edit Personal Info</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
