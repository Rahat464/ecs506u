import React from 'react';
import './Home.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Home = () => {
  return (
    <>
        <Header />
        <div className='Home'>
            <div className='title'>
                <h1>Welcome to your FDM Employee Portal, insertnamehere</h1>
            </div>
            <div className='navigation'>
                
            </div>
        </div>
    </>
  );
};

export default Home;