import React from 'react';
import './Programs.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Programs = () => {
  return (
    <>
        <Header />
        <div className='Programs'>
            <h1>these are the programs</h1>
        </div>
    </>
  );
};

export default Programs;