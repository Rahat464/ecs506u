import React, { useState, useContext, useEffect } from 'react';
import './EditAccount.css';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export const EditAccount = () => {
  document.title = 'Edit Account';

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Initialize state with current user information
  const [firstname, setFirstName] = useState(user ? user.firstname : "");
  const [lastname, setLastName] = useState(user ? user.lastname : "");
  const [phone, setPhoneNumber] = useState(user ? user.phone : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState("");

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/Loginform');
    }
  }, [user, navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      password: password,
    };

    fetch('/api/userProfile', {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if (response.ok) {
        console.log('Updated Successfully');
        navigate('/Account');
      } else {
        throw new Error('Failed to update user information');
      }
    })
    .catch(error => {
      console.log('Error updating user information:', error);
      // Handle error (e.g., show error message to the user)
    });
  };

  return (
    <>
      <div>
        <Header />
      </div>
      
      <div className='edit-container'> 
        <div className='EditAccount-header'>
          <h1>Update Personal information</h1>   
        </div>
        
        <div className='info'>
          <form onSubmit={handleFormSubmit}>
            <div className='input-box'>
              <h1 className='title'>First name</h1>
              <input
                type="text"
                placeholder="First name"
                value={firstname || ""}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <h1 className='title'>Last name</h1>
              <input
                type="text"
                placeholder='Last name'
                value={lastname || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <h1 className='title'>Number</h1>
              <input
                type="text"
                placeholder='Phone Number'
                value={phone || ""}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <h1 className='title'>Email</h1>
              <input
                type="email"
                placeholder='Email'
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input-box'>
              <h1 className='title'>Password</h1>
              <input
                type="password"
                placeholder='Password'
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="save-button" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
