import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobHistory = () => {
  let [jobs, setJobs] = useState([]);
  let [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    let url = '/api/jobs';
    if (filterDate) {
      url = `/api/jobs?filterDate=${filterDate}`;
    }

    axios.get(url)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [filterDate]);

  let formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  let renderEmployees = (employees) => {
    if (employees && employees.length > 0) {
      return (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.first_name} {employee.last_name}
            </li>
          ))}
        </ul>
      );
    } else {
      return <span>No employees assigned</span>;
    }
  };

  return (
    <div>
      <h1>Job List</h1>
      <div>
        <label>
          Date:
          <input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5">No jobs occured on this day</td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.JobID}>
                <td>{job.JobName}</td>
                <td>{job.Location}</td>
                <td>{formatDate(job.StartDate)}</td>
                <td>{formatDate(job.EndDate)}</td>
                <td>{renderEmployees(job.employees)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobHistory;