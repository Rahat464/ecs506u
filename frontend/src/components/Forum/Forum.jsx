import React from 'react';
import './Forum.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const Forum = () => {
  document.title = 'Forum';

  return (
    <>
        <Header />
        <div className='Forum'>
            <h1>this is the forum</h1>
        </div>
    </>
  );
};

export default Forum;