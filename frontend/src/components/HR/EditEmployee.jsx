import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditEmployee.css';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';

export const EditEmployee = () => {
  document.title = 'Edit Employee';

  const navigate = useNavigate();
  const location = useLocation(); 
  const { user } = useContext(UserContext);
  
  const employee = location.state?.employee;
  
  useEffect(() => {
    if (!user) {
      navigate('/Loginform');
    } else if (!employee) {
      console.log('No employee data available.');
      navigate('/SelectEmployee');
    }
  }, [user, employee, navigate]);

  const [firstname, setFirstName] = useState(employee ? employee.firstname : "");
  const [lastname, setLastName] = useState(employee ? employee.lastname : "");
  const [phone, setPhoneNumber] = useState(employee ? employee.phone : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      firstname,
      lastname,
      phone,
      email,
      password, // Might remove later
    };

    fetch(`/api/employees/${employee.id}`, { 
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedEmployee)
    })
    .then(response => {
      if (response.ok) {
        console.log('Employee Updated Successfully');
        navigate('/SelectEmployee');
      } else {
        throw new Error('Failed to update employee information');
      }
    })
    .catch(error => console.log('Error updating employee information:', error));
  };


  return (
    <>
      <div>
        <Header />
      </div>
      
      <div className='employee-container'> 
        <div className='Account-header'>
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

export default EditEmployee;