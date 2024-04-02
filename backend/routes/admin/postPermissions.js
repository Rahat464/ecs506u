const express = require('express');
const router = express.Router();

const db = new (require('../../db'))()

// handle change in permissions (remove or add)
router.post('/permissions', (req, res, next) => {
    
    const alterPermission = async (req) => {

        // req body values
        const canPost = req.body.canPost
        const email = req.body.email

        // debug outputs
        console.log(canPost)
        console.log(email)

        const values = [canPost, email]
        const query = "UPDATE employees SET canpost = $1 WHERE email = $2"


        // maybe rename "res" to "data" or something
        const res = await db.query(query, values)
        console.log(values)

        // If the query fails, return an error message
        // if (res === false) return done(null, false, {message: "Database error"});
        // if (res.rows.length === 1) {
        //     return done(null, res.rows[0])
        // } else {
        //     return done(null, false, {message: "Invalid query"})
        // }

        // temporary response --> needs to be altered for a proper error response
        if (res === false) {
            console.log("Not Working.")
        } else {
            console.log("Working.")
        }
    }

    alterPermission(req)
});


// for now I am quering "issues" - but maybe supportRequests Table is needed.
router.get('/supportRequests', (req, res) => {

    const getSupportRequests = async () => {
        
        // INNER JOIN to include the author name
        const query = "SELECT i.*, e.firstname, e.lastname FROM issue i INNER JOIN employees e ON i.author = e.id ORDER BY i.date DESC;                                                      "
        const data = await db.query(query)

        if (data === false) {
            console.log("Not Working.")
        } else {
            res.json(data.rows)
            console.log("Working.")
        }
    }

    getSupportRequests(req, res)
})


// end point and function for marking an issue solved or unsolved.
router.post('/markIssueSolved', (req, res) => {
    const markSolved = async () => {

        const solved = req.body.solved
        const id = req.body.id

        const values = [solved, id]
        const query = "UPDATE issue SET solved = $1 WHERE id = $2"
        const data = await db.query(query, values)

        if (data === false) {
            console.log("Not Working.")
        } else {
            console.log("Working.")
            res.json({message: "Issue Resolved"})
        }
    }

    markSolved(req, res)
})

module.exports = router;