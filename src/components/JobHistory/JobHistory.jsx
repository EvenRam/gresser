import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    let url = '/api/jobhistory';
    if (filterDate) {
      url = `/api/jobhistory?filterDate=${filterDate}`;
    }

    axios.get(url)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [filterDate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const renderEmployees = (employees) => {
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
      <h1 className ="jobhistory_title" >Job History</h1>
      <div className='date'>
        <label>
          Date:
          <input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </label>
      </div>
      <table className='history-table'>
        <thead>
          <tr>
            <th>Job Number</th>
            <th>Job Name</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Employees</th>
          </tr>
        </thead>
        <tbody className='history-tbody'>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="7">No jobs occurred on this day</td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.job_id}>
                <td>{job.job_number}</td>
                <td>{job.job_name}</td>
                <td>{job.location}</td>
                <td>{formatDate(job.start_date)}</td>
                <td>{formatDate(job.end_date)}</td>
                <td>{job.status ? 'Active' : 'Inactive'}</td>
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
