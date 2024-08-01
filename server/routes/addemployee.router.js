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
    console.log('User is authenticated?:', req.isAuthenticated());
    console.log('Current user is:', req.user.username);
    console.log('Current request body is:', req.body);

    const { first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address, project_id } = req.body;

    const queryText = `
        INSERT INTO "add_employee" (
            "first_name", "last_name", "employee_number", "union_id", "employee_status", "phone_number", "email", "address", "project_id"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING "id"
    `;
    const values = [first_name, last_name, employee_number, union_id, employee_status, phone_number, email, address, project_id];

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
    console.log("employee id", employeeId)
    const {
        first_name,
        last_name,
        employee_number,
        union_id,
        employee_status,
        phone_number,
        email,
        address,
        project_id
    } = req.body;

    if (employee_status !== undefined &&
        !first_name &&
        !last_name &&
        !employee_number &&
        !union_id &&
        !phone_number &&
        !email &&
        !address) {


        // update employee status only
        const queryText = `
    UPDATE "add_employee"
    SET "employee_status" = $1
    WHERE  "id" = $2;
    `;
        console.log("updating status with value", employee_status)
        try {
            await pool.query(queryText, [employee_status, employeeId]);
            res.sendStatus(204);
        } catch (error) {
            console.log(" Error updating employee status", error)
            res.sendStatus(500);
        }

    } else {
        // update all emplyee detiails 
        const values = [
            first_name,
            last_name,
            employee_number,
            union_id,
            employee_status,
            phone_number,
            email,
            address,
            project_id,
            employeeId,
        ];

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
            "project_id" = $9
        WHERE "id" = $10;
    `;

        try {
            const result = await pool.query(query, values);

            if (result.rowCount > 0) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404)
            }

        } catch (error) {
            console.error('Error updating employee:', error);
            res.status(500).json({ error: 'Internal server error' });

        }
    }
});

module.exports = router;