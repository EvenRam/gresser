
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
//Route to get all jobs
router.get('/', (req, res) => {
    //check if the user is authenticated
    if (req.isAuthenticated()) {
        console.log('User is authenticated?:', req.isAuthenticated());
        console.log("Current user is: ", req.user.username);
        const sqlText = `
        SELECT * FROM "jobs"
        `;
        // query database for all jobs
        pool.query(sqlText)
            .then((result) => {
                console.log(`GET from database`, result);
                //send the job rows back
                res.send(result.rows);
            })
            .catch((error) => {
                console.log(`Error making database query ${sqlText}`, error);
                res.sendStatus(500);
            });
    } else {
        // send 401 unauthorized if user if not authenticated
        res.sendStatus(401);
    }
});
//Rooute to create a new job
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('User is authenticated?:', req.isAuthenticated());
    console.log("Current user is:", req.user.username);
    console.log("Current request body is:", req.body);
    //get job info from request body
    const jobInfo = req.body
    const jobs= [ jobInfo.job_number, jobInfo.job_name, jobInfo.location,jobInfo.start_date , jobInfo.end_date, jobInfo.status ]
    const queryText = `
        INSERT INTO "jobs" ("job_number", "job_name", "location", "start_date", "end_date", "status")
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING "job_id"
    `;
    console.log("values", jobs)
    // Add a new job to the database
    pool.query(queryText,jobs )
        .then(() => {
    // 201 Created for successful creation
            res.sendStatus(201); 
        })
        .catch((error) => {
            console.error('Error making POST insert for jobs:', error);
            res.sendStatus(500);
        });
});
// Route to update job
router.put('/:job_id', (req, res) => {
//get job id from URl params
    const idToUpdate = req.params.job_id;
    // get  updated job info from request body
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
    //update jon in the database
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
// Route to delete job by job_id
router.delete('/:job_id', (req, res) => {
    // Get job Id from url params
    const jobId = req.params.job_id;
    console.log('Delete request for jobId', jobId);
    const queryText = `
        DELETE FROM "jobs"
        WHERE "job_id" = $1;
    `;
    // delete job from database
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
