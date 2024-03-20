const express = require('express');
const router = express.Router();

// Define user routes
router.get('/', (req, res) => {
    // Handle the route
    res.send('Register Page API');
});

module.exports = router;
