const express = require('express');
const router = express.Router();

const db = new (require('../../db'))()


// get all blog posts from the database
router.get('/', (req, res) => {
    
        const getPosts = async (req, res) => {
            const query = "SELECT * FROM post"
            const data = await db.query(query)
    
            if (data === false) {
                console.log("Not Working.")
            } else {
                console.log(data.rows)
                console.log("Working.")
            }
        }
    
        getPosts(req)
});


// get all blog posts by a specific author (from id)
router.get('/authorId', (req, res) => {
    
    const getPosts = async (req, res) => {

        const id = req.body.id;

        const query = "Select p.title, p.body, p.date, e.firstname from post p INNER JOIN employees e ON p.author = $1 WHERE e.id = $1;"
        const values = [id]
        const data = await db.query(query, values)

        if (data === false) {
            console.log("Not Working.")
        } else {
            console.log(data.rows)
            console.log("Working.")
        }
    }

    getPosts(req)
});



module.exports = router;