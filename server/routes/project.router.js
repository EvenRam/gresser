const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// router.get('/', (req, res) => {
//     if (req.isAuthenticated()) {
//         console.log('User is authenticated?:', req.isAuthenticated());
//         console.log("Current user is: ", req.user.username);
        
//         const sqlText = `SELECT * FROM "project"`;
//         pool
//             .query(sqlText)
//             .then((result) => {
//                 console.log(`GET from database`, result);
//                 res.send(result.rows);
//             })
//             .catch((error) => {
//                 console.log(`Error making database query ${sqlText}`, error);
//                 res.sendStatus(500);
//             });
//     } else {
//         res.sendStatus(401);
//     }
// });

// router.post('/', rejectUnauthenticated, (req, res) => {
//     console.log('User is authenticated?:', req.isAuthenticated());
//     console.log("Current user is:", req.user.username);
//     console.log("Current request body is:", req.body);

//     const { project_name } = req.body;
//     const queryText = `
//         INSERT INTO "project" ("project_name")
//         VALUES ($1)
//         RETURNING "id"
//     `;
//     const values = [project_name];

//     pool.query(queryText, values)
//         .then(() => {
//             res.sendStatus(201); 
//         })
//         .catch((error) => {
//             console.log('Error making POST insert for project:', error);
//             res.sendStatus(500);
//         });
// });

// This is the one that matches new tables
router.get('/withEmployees', async (req, res) => {
    try {
      const sqlText = `
        SELECT 
          jobs.job_id AS job_id, 
          jobs.job_name AS job_name, 
          add_employee.id AS employee_id, 
          add_employee.first_name AS employee_first_name,
          add_employee.last_name AS employee_last_name
        FROM jobs
        LEFT JOIN add_employee ON jobs.job_id = add_employee.job_id
        ORDER BY jobs.job_id, add_employee.id;
      `;
      
      const result = await pool.query(sqlText);
      
      const jobs = {};
      
      result.rows.forEach(row => {
        
        if (!jobs[row.job_id]) {
          jobs[row.job_id] = {
            id: row.job_id,
            job_name: row.job_name,
            employees: []
          };
        }
        
        if (row.employee_id) {
          jobs[row.job_id].employees.push({
            id: row.employee_id,
            first_name: row.employee_first_name,
            last_name: row.employee_last_name
          });
        }
      });
      
      res.send(Object.values(jobs));
    } catch (error) {
      console.error('Error fetching jobs with employees:', error);
      res.status(500).send('Error fetching jobs with employees');
    }
  });
  
  
// router.get('/withEmployees', async (req, res) => {
//   try {
//     const sqlText = `
//       SELECT 
//         project.id AS project_id, 
//         project.project_name, 
//         add_employee.id AS employee_id, 
//         add_employee.first_name AS employee_first_name,
//         add_employee.last_name AS employee_last_name
//       FROM project
//       LEFT JOIN add_employee ON project.id = add_employee.project_id
//       ORDER BY project.id, add_employee.id;
//     `;
    
//     const result = await pool.query(sqlText);
    
//     const projects = {};
    
//     result.rows.forEach(row => {
      
//       if (!projects[row.project_id]) {
//         projects[row.project_id] = {
//           id: row.project_id,
//           project_name: row.project_name,
//           employees: []
//         };
//       }
      
 
//       if (row.employee_id) {
//         projects[row.project_id].employees.push({
//           id: row.employee_id,
//           first_name: row.employee_first_name,
//           last_name: row.employee_last_name
//         });
//       }
//     });
    
//     res.send(Object.values(projects));
//   } catch (error) {
//     console.error('Error fetching projects with employees:', error);
//     res.status(500).send('Error fetching projects with employees');
//   }
// });

module.exports = router;