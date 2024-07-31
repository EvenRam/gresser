import React, { useState } from 'react';
import ProjectBox from './ProjectBox';
import { useDispatch, useSelector } from 'react-redux';


const projectData = [
  { id: 21, job_name: 'Bricklayers' },
  { id: 22, job_name: 'Cement Masons/Finishers' },
  { id: 23, job_name: 'Laborers' },
  { id: 24, job_name: 'Operators' },
  { id: 25, job_name: 'Carpenters' }
];

const Trades = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.addEmployeeReducer); 
  const projects = useSelector(state => state.jobReducer); 

  const moveEmployee = (employeeId, targetProjectId) => {
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } })
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {projectData.map(project => (
        <ProjectBox
          key={project.id}
          id={project.id}
          job_name={project.job_name}
          employees={projects[project.id] || []} 
          moveEmployee={moveEmployee}
        />
      ))}
    </div>
  );
};

export default Trades;
