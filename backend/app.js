const express = require('express');
const app = express();
const port = 4000;


// simple render for localhost:4000
app.get('/', (req, res) => {
    res.send('Welcome to FDM Employee Portal!');
});

// running the express app --> run with "npm start"
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});