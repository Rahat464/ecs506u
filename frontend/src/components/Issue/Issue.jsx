import './Issue.css'
import Header from '../header/header'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Issue = () => {

    const {user, updateUser} = useContext(UserContext)

    const navigate = useNavigate();

    const sendSupportRequest = async (e) => {
        e.preventDefault();

        const title = e.target[0].value;
        const description = e.target[1].value;
        const date = e.target[2].value;
        const author = user.id;


        fetch('/api/admin/makeSupportRequest', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(
                {
                    "title": title,
                    "description": description,
                    "date": date,
                    "author": author
                }
            )
        }).then( (res) => {
            if (res.status === 200) {
                console.log('Support Request Sent');
                alert('Support Request Sent');
                navigate('/Home');
            } else {
                throw new Error('Unknown status code returned from the server.');
            }
        }).catch( (e) => {
            console.log(e);
        })
    }


    return ( 
        <>
            <Header />

            <div className="issue-page">
                <h1>Issue</h1>
                <p> Submit a Support Request to Admin</p>
                <form onSubmit={ sendSupportRequest }>
                    <div className="input-box">
                        <input type="text" placeholder="Title" required />
                    </div>
                    <div className="input-box">
                        <textarea placeholder="Description" required></textarea>
                    </div>
                    <div className="input-box">
                        <input type="date" />
                    </div>
                    <button className="issue-button" type="submit">Submit</button>
                </form>
            </div>
        </>
     );
}
 
export default Issue;