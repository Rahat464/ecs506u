import React from 'react';
import './Account.css';
import Header from '../header/header';


export const Account = () => {
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
           <p>Zahid</p>
          </div>
            <h1 className='title '>Last name</h1>
          <div className='lname'>
          <p>Zahid</p>
          </div>
          <h1 className='title '>Number</h1>
          <div className='number'>
          <p>Zahid</p>
          </div>
          <h1 className='title '>Email</h1>
          <div className='email'>
          <p>Zahid</p>

          </div>
          <h1 className='title '>Password</h1>
          <div className='password'>
            <p>Zahid</p>
          </div>
          </div>
          
          </div>
          
          </div>

        
    </>
  );
};

export default Account;