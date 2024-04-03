
import './Account.css';
import Header from '../header/header';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';



export const Account = () => {


 // temporary user state rather than context
 const {user, updateUser} = useContext(UserContext);
 // navigate used to redirect users without causing a refresh
 const navigate = useNavigate();

 // checks for user existence
 useEffect(() => {
  if(!user) {
    navigate('/Loginform');
  }
})

  

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
    
          <div className="personal-info">
            <h1 className='title'>First name</h1>
          <div className='fname'>
          {user && <p>{ user.firstname }</p>}
          </div>
            <h1 className='title '>Last name</h1>
          <div className='lname'>
          {user && <p>{ user.lastname }</p>}
          </div>
          <h1 className='title '>Number</h1>
          <div className='number'>
          {user && <p>{ user.phone }</p>}
          </div>
          <h1 className='title '>Email</h1>
          <div className='email'>
          {user && <p>{ user.email }</p>}

          </div>
          
          </div>
          
          </div>
          
          </div>

        
    </>
  );
};

export default Account;