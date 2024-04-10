import React, {useContext, useEffect, useState} from 'react';
import './Home.css';
import FDMLogo from '../../assets/FDMLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import { UserContext } from '../../context/userContext';


export const Home = () => {
  document.title = 'Home';
  const { user } = useContext(UserContext);
  const [ticket, updateTicket] = useState(null);

  // navigate used to redirect users without causing a refresh
  const navigate = useNavigate();


    async function getTickets() {
        console.log('Getting tickets');
        const response = await fetch('/api/ticket/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            updateTicket([])
        }
        const data = await response.json();
        updateTicket(data);
    }

  // checks for user existence
  useEffect(() => {
    if(!user) {
      navigate('/Loginform');
    }
    getTickets().catch(console.error);

  }, [user, navigate]);

  return (
    <>
        <Header />
        <div className='Home'>
            <div className='title'>
                {user && <h1>Welcome to your FDM Employee Portal, { user.firstname }</h1>}
            </div>
            <div className='dashboard'>
                <div className="navigation">
                  <h2>Navigation</h2>
                  <ul className='content'>
                    <li className='main'>Forum</li>
                    <ul>
                      <li><Link to='/Forum' className='link'>View Posts</Link></li>
                      {/* Render Create a Post link based on user's permission */}
                      {user && user.canpost ? (
                        <li><Link to='/CreatePost' className='link'>Create a Post</Link></li>
                      ) : null}
                    </ul>
                    <li className='main' id='x'><Link to='/Contact' className='link'>Contact</Link></li>
                    <li className='main'><Link to='/Documents' className='link'>Documents</Link></li>
                    <li className='main'><Link to='/Programs' className='link'>Programs</Link></li>
                    <div>
                      { user && user.account_type === 'admin' ? (
                        <li className='main'><Link to='/Admin' className='link'> Admin Dashboard </Link></li>
                      ) : (
                        <></>
                       )}
                    </div>
                    <div>
                      { user && user.account_type === 'hr' ? (
                        <li className='dropdown'>
                          <p className='main'>HR</p>
                          <ul className='y'>
                            <li><Link to='/SendPayslip' className='link'>Send payslip</Link></li>
                            <li><Link to='/SelectEmployee' className='link'>Edit employee account</Link></li>
                          </ul>
                        </li>
                      ) : (
                        <></>
                       )}
                    </div>
                    <li className='main'>Account</li>
                    <ul>
                      <li><Link to='/Account' className='link'>Account</Link></li>
                      <li><Link to='/EditAccount' className='link'>Edit Account Info</Link></li>
                      <li><Link to='/LeaveRequest' className='link'>Request</Link></li>
                      <li><Link to='/Issue' className='link'> Issue </Link></li>
                    </ul>
                  </ul>
                </div>
                <div className='hours'>
                  <h3>Hours Worked This Week</h3>
                    <h1>{(user && user.hoursworked) ? (user.hoursworked + " hrs") : "Unknown"}</h1>
                </div>
                <div className='announce'>
                <h3>Company Accouncements</h3>
                  <p>Company meeting on 11/04</p> {/*placeholder*/}
                </div>
                <div className="ticket">
                  <h3>Ticket Status</h3>
                    <UserContext.Provider value={{ ticket, getTickets }}>
                        {
                            ticket && Array.isArray(ticket) && ticket.length > 0 ? (
                                ticket.map((ticket) => {
                                    return (
                                        <div key={ticket.id}>
                                            <p>{ticket.title + " "}
                                                ({ticket.status ? 'Closed' : 'Open'})
                                            </p>
                                        </div>
                                    )
                                })
                            ) : (
                                <p>No submitted tickets</p>
                            )
                        }
                    </UserContext.Provider>
                </div>
            </div>
        </div>
    </>
  );
};

export default Home;
