import React, { useState, useContext, useEffect } from 'react';
import Header from '../header/header';
import './LeaveRequest.css';

const LeaveRequest = () => {

    

      // State to track the selected option
      const [selectedOption, setSelectedOption] = useState('');
    
      // State to track start and end dates
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      
      // Function to handle option change
      const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
      };



    return (

        <>
          <div>
            <Header />
          </div>
    
          <div className='wrapper'>
            <div className='Account-header'>
              <h1>Request</h1>
            </div>
    
            <div className='info'>
                
              <div className='personal-info'>
                <h1 className='title'>Short Description</h1>
                <div className='desc'>
                    
                    <input className="inputDesc" type="text" />
                </div>
               <h1 className='title'>Notes</h1>
                     <textarea 
                        className="inputNotes" 
                        rows="5" 
                    />

                <h1 className='title'>Select Request Type</h1>
                {/* Dropdown menu for selecting request type */}
                <select className="select" value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select...</option>
                    <option value="leaveRequest">Leave Request</option>
                    <option value="generalTicket">General Ticket</option>
                </select>

                {selectedOption === 'leaveRequest' && (
                    <>
                        <h1 className='title'>Start Date</h1>
                        <div className='startDate'>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        
                        <h1 className='title'>End Date</h1>
                        <div className='endDate'>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </>
                )}


               
                <div>
                  
                    <button>Submit Request</button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      );
}

export default LeaveRequest
