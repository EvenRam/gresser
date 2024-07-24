import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const url = getJobsUrl(filterDate);
        const response = await axios.get(url);
        console.log('Jobs API Response:', response.data);  
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, [filterDate]);

  function getJobsUrl(filterDate) {
    if (filterDate) {
      return `/api/jobs?filterDate=${filterDate}`;
    }
    return '/api/jobs';
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  function handleDateChange(event) {
    setFilterDate(event.target.value);
  }

  return (
    <div>
      <h1>Job List</h1>
      <div>
        <label>
          Date:
          <input type="date" value={filterDate} onChange={handleDateChange} />
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
          {jobs.length > 0 ? (
            jobs.map(function (job) {
              return (
                <tr key={job.JobID}>
                  <td>{job.JobName}</td>
                  <td>{job.Location}</td>
                  <td>{formatDate(job.StartDate)}</td>
                  <td>{formatDate(job.EndDate)}</td>
                  <td>
                    {job.employees && job.employees.length > 0 ? (
                      <ul>
                        {job.employees.map(function (employee) {
                          return (
                            <li key={employee.id}>
                              {employee.first_name} {employee.last_name}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <span>No employees assigned</span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No jobs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobsList;
