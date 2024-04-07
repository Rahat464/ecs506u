import React, { useContext, useEffect, useState } from 'react';
import './SelectEmployee.css';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search-icon.png';

export const SelectEmployee = () => {
  document.title = 'Select Employee';

  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate(); // For navigation after selection, if needed

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('query');
    if (query) {
      fetchSearchResults(query);
    }
  }, []);

  const fetchSearchResults = async (query) => {
    fetch('/api/search', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "searchParam": query
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
    .then(data => setSearchResults(data.searchResults))
    .catch(error => console.error("Error fetching data:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(searchQuery);
  };

  const handleSelectEmployee = (employeeId) => {
    console.log(`Selected employee ID: ${employeeId}`);
    // Implement your logic upon selecting an employee
    // For example: navigate(`/employee/${employeeId}`);
  };

  const title = !searchQuery ? "All employees:" : `Accounts with '${searchQuery}' in first name`;

  return (
    <>
      <Header />
      <div className='SearchResults'>
        <form onSubmit={handleSubmit} className='search-bar'>
          <input
            type='text'
            placeholder='Search for employee'
            className='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit' className='searchButton'><img src={searchIcon} className="searchIcon" alt="Search"/></button>
        </form>
        <h1 className='title'>{title}</h1>
        <div className='headings'>
          <h2>Name</h2>
          <h2>Email</h2>
          <h2>Role</h2>
          <h2>Action</h2> {/* Additional header for actions */}
        </div>
        {searchResults && <div className='results'>
          {searchResults.map((result) => (
            <div className='result' key={result.id}>
              <p>{result.firstname} {result.lastname}</p>
              <p>{result.email}</p>
              <p>{result.account_type}</p>
              <button onClick={() => handleSelectEmployee(result.id)} className="selectButton">Select</button>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default SelectEmployee;
