// login.jsx
import { useState } from 'react';
import './LoginForm.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import FDMLogo from '../../assets/FDMLogo.png'
import { Link } from 'react-router-dom';
import Header from '../header/header';


export const LoginForm = () => {

  // state for the email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // handle the call to the backend for logging in
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate the email using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailRegex)) {
      document.getElementById('invalid-credentials').innerText = 'Invalid Email. Please try again.';
      document.querySelector('input[type="email"]').style.border = '1px solid red';
      return;
    }

    // call from proxy
    fetch('/api/login/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
        {
          "email": email,
          "password": password
        }
      )
    }).then( (res) => {
      if (res.status === 200) { // successful login
        console.log('Logged In Successfully');
        window.location.href = '/Dashboard';
      } else if (res.status === 401){ // invalid credentials
        document.getElementById('invalid-credentials').innerText = 'Invalid Credentials. Please try again.';
        document.querySelector('input[type="email"]').style.border = '1px solid red';
        document.querySelector('input[type="password"]').style.border = '1px solid red';
      } else {
        throw new Error('Unknown status code returned from the server.');
      }
    }).catch( (e) => {
      console.log('Error Logging In:', e);
    })
  }


  return (
    <>
    <Header />
      <div className='Login'>
        <div className='shadow'></div>
        <form onSubmit={handleLogin}>
          <div className="Logo">
            <img src={FDMLogo} alt="fdm logo"/>
          </div>
          <h1>Login</h1>
          <p>Sign in to your account</p>
          <div className='input-box'>
            <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <FaLock className='icon'/>
          </div>

          <button type="submit">Login</button>

          <div className="forgot-password">
            <a href="#"> Forgot password?</a>
          </div>

          <div className="register-link">
            <Link to='/SignUp'>Sign Up</Link>
          </div>
        </form>
        <p id="invalid-credentials"></p>
      </div>
    </>
  );
};

export default LoginForm;