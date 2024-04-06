import React, { useContext, useEffect } from 'react';
import './SearchResults.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';
import { useLocation } from 'react-router-dom';


export const SearchResults = () => {
  
  const { user, updateUser } = useContext(UserContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  console.log({query});

  return (
    <>
        <Header />
        <div className='SearchResults'>
            <h1 className='title'>Accounts with '{query}' in name</h1>
            <div className='results'>

            </div>
        </div>
    </>
  );
};

export default SearchResults;