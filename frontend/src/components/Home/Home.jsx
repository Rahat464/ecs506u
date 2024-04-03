import React, { useContext, useEffect } from 'react';
import './Home.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';


export const Home = () => {

  const { user, updateUser } = useContext(UserContext);

  // navigate used to redirect users without causing a refresh
  const navigate = useNavigate();

  // checks for user existence
  useEffect(() => {
    if(!user) {
      navigate('/Loginform');
    }
  })

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'POST'
    })
    .then( (res) => {
      if (res.status === 200) {
        updateUser(null);
        localStorage.removeItem('user');
        navigate('/Loginform');
      } else {
        throw new Error('Unknown status code returned from the server.');
      }
    })
  }

  return (
    <>
        <Header />
        <div className='Home'>
            <div className='title'>
                {user && <h1>Welcome to your FDM Employee Portal, { user.firstname }</h1>}
            </div>
            <button onClick={ handleLogout }> Logout </button>
            <div className='navigation'>
                
            </div>
        </div>
    </>
  );
};

export default Home;