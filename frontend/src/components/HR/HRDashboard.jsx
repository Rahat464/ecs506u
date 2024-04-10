import { useContext, useEffect, useState } from "react";
import Header from "../header/header";
import './HRDashboard.css';
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
    document.title = 'HR Dashboard';

    const [leaveRequests, setLeaveRequests] = useState([]);

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await fetch('/api/ticket/getList', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                });
                const data = await response.json();
                setLeaveRequests(data);

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLeaveRequests();
    }, []);

    const updateRequestStatus = async (requestId, status) => {
        try {
            fetch(`/api/ticket/updateStatus/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ status })
            });

            // Update the list of leave requests to reflect the change
            setLeaveRequests(prevRequests =>
                prevRequests.map(req => req.id === requestId ? { ...req, status } : req)
            );

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Header />
            {user && <h1 className="page-title">Welcome to the HR Dashboard, {user.firstname}</h1>}
            <div className="hr-page">
                <div className="leave-requests-section">
                    {leaveRequests.length > 0 ? (
                        <div className="dashboard">
                            {leaveRequests.map(request => (
                                <div className="request" key={request.id}>
                                    <h1>{request.title}</h1>
                                    <div className="request-information">
                                        <p className="description">{request.description}</p>
                                        <div className="request-info">
                                            <p>Submitted by {request.firstname} {request.lastname}</p>
                                            <p>on {new Date(request.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <button className="action-btn approve-btn" onClick={() => updateRequestStatus(request.id, 'approved')}>Approve</button>
                                    <button className="action-btn disapprove-btn" onClick={() => updateRequestStatus(request.id, 'disapproved')}>Disapprove</button>
                                </div>
                            ))}
                        </div>
                    ) : <p>No leave requests to show</p>}
                </div>
            </div>
        </>
    );
};

export default HRDashboard;