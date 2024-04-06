import React from 'react';
import './Documents.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Documents = () => {
  document.title = 'Your Documents';

  return (
    <>
        <Header />
        <div className='Documents'>
            <h1>these are your documents</h1>
        </div>
    </>
  );
};

export default Documents;