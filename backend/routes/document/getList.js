// Get a list of all documents uploaded by the current logged-in user
const express = require('express');
const router = express.Router();
const db = new (require('../../db'))();

router.get('/', async (req, res) => {
        // Check that the user is logged in
        if (!req.user) return res.status(401).json({message: 'Unauthorized. Please log in.'});

        // Get all documents uploaded by the current user
        const query = `SELECT * FROM document WHERE owner = $1`;
        const queryResult = await db.query(query, [req.user.id]);

        res.status(200).json(queryResult.rows);
});

module.exports = router;