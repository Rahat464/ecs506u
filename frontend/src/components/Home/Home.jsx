import React, { useContext } from 'react';
import './Home.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';


export const Home = () => {

  const { user, updateUser } = useContext(UserContext);

  return (
    <>
        <Header />
        <div className='Home'>
            <div className='title'>
                {user && <h1>Welcome to your FDM Employee Portal, { user.firstname }</h1>}
            </div>
            {/* <button onClick={ () => { console.log(user)}}> LOL </button> */}
            <div className='navigation'>
                
            </div>
        </div>
    </>
  );
};

export default Home;