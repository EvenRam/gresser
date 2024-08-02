import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import Employee from './Employee';

const Scheduling = () => {
  const dispatch = useDispatch();
  const employeeCard = useSelector((state) => state.cardReducer); 
  const jobsBox = useSelector((state) => state.jobReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_EMPLOYEE_CARD' });
    dispatch({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' }); 
  }, [dispatch]);

  const moveEmployee = (employeeId, targetProjectId) => {
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } });
  };

  return (
    <div>
      <h3>Employees</h3>
      {employeeCard.map((employee) => (
        <Employee 
          key={employee.id} 
          id={employee.id} 
          name={`${employee.first_name} ${employee.last_name}`} 
          number={`${employee.phone_number}`} 
          email={`${employee.email}`} 
          address={`${employee.address}`}
        />
      ))}

      <div>
        <h3>Jobs</h3>
        {!jobsBox || jobsBox.length === 0 || !Array.isArray(jobsBox) ? (
          <table>
            <tbody>
              <tr>
                <td colSpan="7">YOU HAVE NO JOBS</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', maxWidth: '40%' }}>
            {jobsBox.map((job) => (
              <div key={job.id} style={{ width: '35%', boxSizing: 'border-box', padding: '10px' }}>
                <ProjectBox
                  id={job.id}
                  job_name={job.job_name}
                  employees={job.employees}
                  moveEmployee={moveEmployee}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduling;



