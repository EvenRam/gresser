const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', async (req, res) => {
  try {
    const { filterDate } = req.query;
    let queryParams = [];
    let jobQuery = `
      SELECT j.*
      FROM "Jobs" j
    `;

    if (filterDate) {
      jobQuery += ` WHERE $1 BETWEEN j."StartDate" AND j."EndDate"`;
      queryParams.push(filterDate);
    }

    jobQuery += ` ORDER BY j."JobID"`;

    const result = await pool.query(jobQuery, queryParams);

    console.log('Job Query Result:', result.rows);  
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
