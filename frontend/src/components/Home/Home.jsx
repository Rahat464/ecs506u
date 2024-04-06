import React, { useContext, useEffect } from 'react';
import './Home.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';


export const Home = () => {
  document.title = 'Home';
  const { user, updateUser } = useContext(UserContext);

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
        <Header />
        <div className='Home'>
            <div className='title'>
                {user && <h1>Welcome to your FDM Employee Portal, { user.firstname }</h1>}
            </div>
            <div className='navigation'>
                
            </div>
        </div>
    </>
  );
};

export default Home;