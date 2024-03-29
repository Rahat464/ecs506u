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
            <h1>this is the dashboard</h1>
        </div>
    </>
  );
};

export default Home;