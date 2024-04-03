import React, { useContext, useEffect } from 'react';
import './CreatePost.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';


export const CreatePost = () => {

  const { user, updateUser } = useContext(UserContext); 

  // used to redirect users without causing a refresh
  const navigate = useNavigate(); 

  // checks for user authentication and permission to post
  useEffect(() => {
    if(!user) {
      navigate('/Loginform');
      return
    }
    if(user.canpost === false) {
      alert('You do not have permission to post.')
      navigate('/Home')
      return
    }
  }, [])

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