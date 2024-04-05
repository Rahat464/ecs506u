import React, { useContext } from 'react';
import './header.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';


export const Header = () => {

    // import the userContext in order to conditionally render the nav bar
    const { user, updateUser } = useContext(UserContext);

    // navigate used to redirect users without causing a refresh
    const navigate = useNavigate();

    // function to handle logout and redirect users to the login page
    const handleLogout = () => {
        fetch('/api/logout', {
          method: 'POST'
        })
        .then( (res) => {
          if (res.status === 200) {
            updateUser(null);
            localStorage.removeItem('user');
            navigate('/Loginform');
          } else {
            throw new Error('Unknown status code returned from the server.');
          }
        })
      }

  return (
    <>
        <div className='Header'>
            <ul>
                <li>
                    <Link to = '/LandingPage'><img src={FDMLogo} /></Link>
                </li>
            </ul>
              {/* if user render this */}
                {user ? ( 
                <ul>
                    <li><Link to='/Home' className='link'>Home</Link></li>
                    <li className='dropdown'>
                        Forum
                        <ul className='dropdown-forum'>
                            <li><Link to='/Forum' className='link'>View Posts</Link></li>
                            <li><Link to='/CreatePost' className='link'>Create a Post</Link></li>
                        </ul>
                    </li>
                    <li><Link to='/Contact' className='link'>Contact</Link></li>
                    <li><Link to='/Documents' className='link'>Documents</Link></li>
                    <li><Link to='/Programs' className='link'>Programs</Link></li>
                    <div>
                      { user.account_type === 'admin' ? (
                        <li><Link to='/Admin' className='link'> Admin Dashboard </Link></li>
                      ) : (
                        <></>
                       )}
                    </div>
                    <div>
                      { user.account_type === 'hr' ? (
                        <li><Link to='/HR' className='link'> HR Dashboard </Link></li>
                      ) : (
                        <></>
                       )}
                    </div>
                    <li className='dropdown'>
                        Account
                        <ul className='dropdown-account'>
                            <li><Link to='/Account' className='link'>Account</Link></li>
                            <li><Link to='/EditAccount' className='link'>Edit Account Info</Link></li>
                            <li><Link to='/LeaveRequest' className='link'>Request</Link></li>
                        </ul>
                    </li>
                    <li> <button onClick={ handleLogout }> Logout </button></li>
                </ul>
                

                ) : (
                  // otherwise render this 
                    <ul>
                        <li><Link to='/Loginform' className='link'> Login </Link></li>
                        <li><Link to='/Signup' className='link'> Signup </Link></li>
                    </ul>
                 )  }
        </div>
    </>
  );
};

export default Header;