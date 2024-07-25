const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', async (req, res) => {
  try {
    const filterDate = req.query.filterDate;

    let jobsQuery = 'SELECT * FROM "jobs"';
    let queryParams = '';

    if (filterDate) {
      queryParams = ` WHERE '${filterDate}' BETWEEN "start_date" AND "end_date"`;
    }

    jobsQuery += queryParams;
    jobsQuery += ' ORDER BY "job_id"';

    const jobsResult = await pool.query(jobsQuery);
    const jobs = jobsResult.rows;

    for (let job of jobs) {
      const employeesQuery = `SELECT * FROM "user" WHERE "location" = '${job.location}'`;
      const employeesResult = await pool.query(employeesQuery);
      job.employees = employeesResult.rows;
    }

    res.json(jobs);

  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
