const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `
        SELECT * FROM "add_employee" 
        ORDER BY "last_name" ASC, "first_name" ASC;
    `;
    
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

router.get('/employeecard', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);

        const sqlText = `
SELECT "id", "first_name", "last_name"
FROM "add_employee"
WHERE "project_id" IS NULL
ORDER BY "last_name" ASC, "first_name" ASC;
        `;

        pool
            .query(sqlText)
            .then((result) => {
                console.log(`GET from database`, result);
                res.send(result.rows);
            })
            .catch((error) => {
                console.log(`Error making database query ${sqlText}`, error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(401);
    }
});


router.post('/', rejectUnauthenticated, (req, res) => {
    const { first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address } = req.body;

    const queryText = `
        INSERT INTO "add_employee" (
            "first_name", "last_name", "employee_number", "union_id", "employee_status", "phone_number", "email", "address"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING "id"
    `;
    const values = [first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address];

    pool.query(queryText, values)
        .then((result) => {
            res.status(201).send({ id: result.rows[0].id });
        })
        .catch((error) => {
            console.error('Error making POST insert for add_employee:', error);
            res.sendStatus(500);
        });
});

router.put('/:id', rejectUnauthenticated, async (req, res) => {
    const employeeId = req.params.id;
    const { location } = req.body;

    const query = `
        UPDATE add_employee 
        SET location = $1
        WHERE id = $2;
    `;

    const values = [location, employeeId];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating employee location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;