import React from 'react';
import './CreatePost.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const CreatePost = () => {
  return (
    <>
        <Header />
        <div className='CreatePost'>
            <h1>this is where you can create a post</h1>
        </div>
    </>
  );
};

export default CreatePost;