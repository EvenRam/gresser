
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);

        const sqlText = `
        SELECT * FROM "jobs"
        `;

        pool.query(sqlText)
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
    console.log("Current user is:", req.user.username);
    console.log("Current request body is:", req.body);

    
    const jobInfo = req.body



    
    const jobs= [ jobInfo.job_number, jobInfo.job_name, jobInfo.location,jobInfo.start_date , jobInfo.end_date, jobInfo.status ]

    const queryText = `
        INSERT INTO "jobs" ("job_number", "job_name", "location", "start_date", "end_date", "status")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING "job_id"
    `;
    console.log("values", jobs)

    pool.query(queryText,jobs )
        .then(() => {
            res.sendStatus(201); // 201 Created for successful creation
        })
        .catch((error) => {
            console.error('Error making POST insert for jobs:', error);
            res.sendStatus(500);
        });
});

router.put('/:job_id', (req, res) => {

    const idToUpdate = req.params.job_id;
    const editJob = req.body

    console.log('req.body', editJob)
    console.log('req.params.id', idToUpdate)

    const updateJob = [

        editJob.job_number,
        editJob.job_name,
        editJob.location,
        editJob.start_date,
        editJob.end_date,
        editJob.status,
        idToUpdate,
    ]

    const sqlText = `
    UPDATE "jobs"
    SET "job_number" = $1,
    "job_name" = $2,
    "location" = $3,    
    "start_date" = $4,
    "end_date" = $5,
    "status" = $6
    WHERE "job_id" = $7;

`

    pool.query(sqlText, updateJob)
        .then((result) => {
            if (result.rowCount > 0) {
                res.sendStatus(204);
            } else {
                res.sendStatus(403);
            }
        })
        .catch((error) => {
            console.log("Error updating jobs:", error)
            res.sendStatus(500)
        })
})

router.delete('/:job_id', (req, res) => {
    const jobId = req.params.job_id;
    console.log('Delete request for jobId', jobId);

    const queryText = `
        DELETE FROM "jobs"
        WHERE "job_id" = $1;
    `;
    
    pool.query(queryText, [jobId])
        .then((result) => {
            if (result.rowCount > 0) {
                res.sendStatus(204);
            } else {
                res.sendStatus(403);
            }
        })
        .catch((error) => {
            console.log('error making query...', error);
            res.sendStatus(500);
        });
});

module.exports = router;