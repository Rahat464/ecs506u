// Path: backend/package.json

// Importing express module
const express = require('express');
const app = express();

// Use environment variables
require('dotenv').config();
const ENV = process.env;

// running the express app --> run with "npm start"
app.listen(ENV.PORT, () => {
    console.log(`listening on port ${ENV.PORT}`)
});

// Defining the routes

// Home Page
app.get('/', (req, res) => {
    res.send('Welcome to FDM Employee Portal!');
});

// TODO: Split the routes into separate files using express Router