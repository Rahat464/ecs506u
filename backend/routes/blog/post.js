const express = require('express');
const router = express.Router();

const db = new (require('../../db'))()


// get all blog posts from the database
router.get('/', (req, res) => {
    
        const getPosts = async () => {
            const query = "SELECT * FROM post"
            const data = await db.query(query)
    
            if (data === false) {
                res.status(400).send("Error getting posts.")
                console.log("Not Working.")
            } else {
                console.log(data.rows)
                res.status(200).json(data.rows) 
                console.log("Working.")
            }
        }
    
        getPosts(req)
});


// get all blog posts by a specific author (from id)
router.get('/authorId', (req, res) => {
    
    const getPosts = async () => {

        const id = req.body.id;

        const query = "Select p.title, p.body, p.date, e.firstname from post p INNER JOIN employees e ON p.author = $1 WHERE e.id = $1;"
        const values = [id]
        const data = await db.query(query, values)

        if (data === false) {
            res.status(400).send("Error getting posts.")
            console.log("Not Working.")
        } else {
            console.log(data.rows)
            res.status(200).json(data.rows) // response is not working properly
            console.log("Working.")
        }
    }

    getPosts(req)
});


// get posts by date range
router.get("/date", (req, res) => {
    
    const getPostsByDateRange = async () => {

        const startdate = req.body.startdate;
        const enddate = req.body.enddate;

        const query = "Select p.title, p.body, p.date, e.firstname FROM post p INNER JOIN employees e ON p.author = e.id WHERE p.date >= $1 AND p.date <= $2;"
        const values = [startdate, enddate]
        const data = await db.query(query, values)

        if (data === false) {
            res.status(400).send("Error getting posts.")
            console.log("Not Working.")
        } else {
            console.log(data.rows)
            res.status(200).json(data.rows) // response is not working properly
            console.log("Working.")
        }
    }

    getPostsByDateRange()
})

// create a post
router.post('/newblog', (req, res) => {
        
        const createPost = async () => {
    
            const title = req.body.title;
            const body = req.body.body;
            const date = req.body.date;
            const author = req.body.author;
    
            const query = "INSERT INTO post (title, body, date, author) VALUES ($1, $2, $3, $4);"
            const values = [title, body, date, author]
            const data = await db.query(query, values)
    
            if (data === false) {
                console.log("Not Working.")
                res.status(400).send("Error creating post.")
            } else {
                res.status(200).send("Post created.")
                console.log("Working.")
            }
        }
    
        createPost(req)
    
}) 

// reply to a post
router.post('/reply', (req, res) => {
    

    // not working for some reason -- some issue with the not null constraints
    const replyToPost = async () => {

        const postid = req.body.postid;
        const reply = req.body.reply;
        const author = req.body.author;

        const query = "INSERT INTO postreplies (replyto, body, author) VALUES ($1, $2, $3);"
        const values = [postid, reply, author]
        const data = await db.query(query, values)

        if (data === false) {
            console.log("Not Working.")
            res.status(400).send("Error replying to post.")
        } else {
            res.status(200).send("Reply posted.")
            console.log("Working.")
        }
    }

    replyToPost()

})


module.exports = router;