// Manage ticket routes for HR employees
const express = require('express');
const router = express.Router();
const db = new (require('../../db'))();

// GET unresolved tickets (Page for HR employees to view all unresolved tickets)
// TODO: Implement sort/filter by status (open, closed, managedBy HR user XYZ etc.)
router.get('/', async (req, res) => {
    // Check that the user is logged in as an HR employee
    if (!req.user || req.user.role !== "hr") return res.status(401).json({message: 'Unauthorized. Please log in as an HR employee.'});

    // Get all unresolved tickets
    const query = 'SELECT * FROM ticket WHERE status = $1;';
    const tickets = await db.query(query, [false]);

    // If the query is successful, return the tickets
    if (tickets) {
        res.status(200).json(tickets.rows);
    } else {
        res.status(400).json({message: 'Error getting tickets.'});
    }
});

// Update ticket status (for HR employees)
// TODO: Write this route after front end is implemented

// Assign ticket to HR user (e.g. managedBy null -> HR user id)
// TODO: Write this route after front end is implemented

module.exports = router;