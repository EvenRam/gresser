const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);
        
        const sqlText = `SELECT * FROM "add_employee" 
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
router.get('/employeecard', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);

        const sqlText = `
SELECT "id", "first_name", "last_name"
FROM "add_employee"
WHERE "job_id" IS NULL
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
    console.log('User is authenticated?:', req.isAuthenticated());
    console.log('Current user is:', req.user.username);
    console.log('Current request body is:', req.body);

    const { first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address, job_id } = req.body;

    const queryText = `
        INSERT INTO "add_employee" (
            "first_name", "last_name", "employee_number", "union_id", "employee_status", "phone_number", "email", "address", "job_id"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING "id"
    `;
    const values = [first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address, job_id];

    pool.query(queryText, values)
        .then((result) => {
            res.status(201).send({ id: result.rows[0].id }); 
        })
        .catch((error) => {
            console.error('Error making POST insert for add_employee:', error);
            res.sendStatus(500);
        });
});

router.put('/:id', async (req, res) => {
    const employeeId = req.params.id;
    const {
        first_name,
        last_name,
        employee_number,
        union_id,
        employee_status,
        phone_number,
        email,
        address,
        job_id
    } = req.body;

    const query = `
        UPDATE "add_employee" 
        SET 
            "first_name" = $1, 
            "last_name" = $2, 
            "employee_number" = $3, 
            "union_id" = $4, 
            "employee_status" = $5, 
            "phone_number" = $6, 
            "email" = $7, 
            "address" = $8,
            "job_id" = $9
        WHERE "id" = $10;
    `;

    const values = [
        first_name,
        last_name,
        employee_number,
        union_id,
        employee_status,
        phone_number,
        email,
        address,
        job_id,
        employeeId
    ];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) { 
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;