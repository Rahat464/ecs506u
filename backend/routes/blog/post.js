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
router.post('/reply', async (req, res) => {
    // Check if required fields are present in the request body
    const { postid, body, author } = req.body;
    if (!postid || !body || !author) {
      return res.status(400).send("Missing required fields.");
    }
  
    try {
      const query = "INSERT INTO postreplies (replyto, body, author) VALUES ($1, $2, $3);";
      const values = [postid, body, author];
      
      // Execute the database query
      const data = await db.query(query, values);
  
      if (data === false) {
        console.log("Error replying to post.");
        return res.status(400).send("Error replying to post.");
      } else {
        console.log("Reply posted.");
        return res.status(200).send("Reply posted.");
      }
    } catch (error) {
      console.error("Error replying to post:", error);
      return res.status(500).send("Internal Server Error.");
    }
  });
  


// get all replies for a specific post
router.get('/replies/:postid', async (req, res) => {
    try {
      const postid = req.params.postid;
      const query = "SELECT * FROM postreplies WHERE replyto = $1;";
      const values = [postid];
      const data = await db.query(query, values);
      if (data === false) {
        res.status(400).send("Error getting replies.");
        console.log("Not Working.");
      } else {
        console.log(data.rows);
        res.status(200).json(data.rows);
        console.log("Working.");
      }
    } catch (error) {
      console.error("Error fetching replies for post:", error);
      res.status(500).send("Server error.");
    }
  });


module.exports = router;