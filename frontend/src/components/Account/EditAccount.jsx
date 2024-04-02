import React from 'react';
import './EditAccount.css';
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Account = () => {
  return (
    <>
        <div>
          <Header />
        </div>
        
       
        <div className='wrapper'> 
        
          <div className='Account-header'>
            <h1>Update Personal information</h1>   
          </div>
          <div className='info'>
            <h1 className='title'>First name</h1>
          <div className='input-box'>
          <input
                type="text"
                placeholder='First name'
                required
            />
          </div>
            <h1 className='title '>Last name</h1>
          <div className='input-box'>
          <input
                type="text"
                placeholder='Last name'
                required
            />
          </div>
          <h1 className='title '>Number</h1>
          <div className='input-box'>
          <input
                type="text"
                placeholder='First Name'
                required
            />
          </div>
          <h1 className='title '>Email</h1>
          <div className='input-box'>
          <input
                type="email"
                placeholder='Email'
                required
          />

          </div>
          <h1 className='title '>Password</h1>
          <div className='input-box'>
          <input
                type="password"
                placeholder='Password'
                required
            />
          </div>
          </div>

        </div>
    </>
  );
};

export default Account;