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

// Import Routes
const login = require('./routes/auth/login');
const register = require('./routes/auth/register');

// Home Page
app.get('/', (req, res) => {
    res.send('Welcome to FDM Employee Portal!');
});

// Routes
app.use('api/login', login);
app.use('api/register', register);
