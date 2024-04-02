import { useEffect, useState } from "react";
import Header from "../header/header";

import './admin.css';

const Admin = () => {

    // this page needs to be restricted to admin only based on the user role
    // user role can be found in the employees table under the account_type

    const [issues, setIssues] = useState([]);
    const [solved, setSolved] = useState([]);



    useEffect(() => {
        const getIssues = async () => {
            try {
                const response = await fetch('/api/admin/supportRequests', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    }
                });
                const data = await response.json();
                console.log(data);

                const solvedIssues = data.filter(issue => issue.solved === true);
                setSolved(solvedIssues);



                setIssues(data);

            } catch (error) {
                console.log('Error:', error);
            }

        }

        getIssues();
    }, [])


    // marks issue solved from the issue card
    const markSolved = async (issue) => {
        console.log("Marking solved.")

        try {
            await fetch('/api/admin/markIssueSolved', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    solved: true,
                    id: issue.id
                })
            });
        } catch (error) {
            console.log('Error:', error);
        }

        // move issue from 1 array to the other
        // removing from issues
        setIssues( issues => {
            return issues.filter( i => i.id !== issue.id)
        })


        // placing into solved
        setSolved( [
            ...solved,
            issue
        ])


    }

    const markUnSolved = async (issue) => {
        console.log("Marking solved.")

        try {
            await fetch('/api/admin/markIssueSolved', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    solved: false,
                    id: issue.id
                })
            });
        } catch (error) {
            console.log('Error:', error);
        }
        
        // move issue from 1 array to the other
        // removing from issues
        setSolved( solved => {
            return solved.filter( s => s.id !== issue.id)
        })


        // placing into solved
        setIssues( [
            ...issues,
            issue
        ])

    }

    return ( 
        <div>
            <Header />


            {/* simple search for all, solved or unsolved */}
            <div className="issue-search">
                <input type="text" placeholder="Search Issues" />
                <select name="" id="">
                    <option value=""> All </option>
                    <option value=""> Solved </option>
                    <option value=""> Unsolved </option>
                </select>
                <button>Search</button>
            </div>

            {issues && 
            <div className="dashboard">
                {issues.map(issue => (
                    <div className="issue" key={issue.id}>
                        <h1> {issue.title} </h1>
                        <p className="description"> {issue.description} </p>
                        <p> submitted by {issue.firstname} {issue.lastname} </p>
                        {/* needs date formating  */}
                        <p> {issue.date} </p>
                        <button className="solved-btn" onClick={ () => { markSolved(issue) }}>Mark as Solved</button>
                    </div>
                ))}
            </div>}

            <button onClick={ () => { console.log(solved)} }> Show solved </button>

            {solved && 
            <div>
                {solved.map(solvedIssue => (
                    <div className="solved-issues" key={solvedIssue.id}>
                        <h1> {solvedIssue.title} </h1>
                        <p className="description"> {solvedIssue.description} </p>
                        <p> submitted by {solvedIssue.firstname} {solvedIssue.lastname} </p>
                        {/* needs date formating  */}
                        <p> {solvedIssue.date} </p>
                        <button className="solved-btn" onClick={ () => { markUnSolved(solvedIssue) }}>Mark as Solved</button>
                    </div>
                ))}
            </div>}
            <br />
        </div>
     );
}
 
export default Admin;