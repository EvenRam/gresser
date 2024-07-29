import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectBox from './ProjectBox';
import Employee from './Employee';

/**
 * Comment
 */
const Scheduling = () => {
  const dispatch = useDispatch();
  const employeeCard = useSelector((state) => state.cardReducer); 
  const projects = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_EMPLOYEE_CARD' });
    dispatch({ type: 'FETCH_PROJECT' });
    dispatch({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES' }); 
  }, [dispatch]);

  const moveEmployee = (employeeId, targetProjectId) => {
    console.log('Move Employee', employeeId, 'to', targetProjectId);
    dispatch({ type: 'MOVE_EMPLOYEE', payload: { employeeId, targetProjectId } });
  
  };

 
 
 

  return (
    <div>
      <h3>Employees</h3>
      {employeeCard.map((employee) => (
        <Employee key={employee.id} id={employee.id} name={`${employee.first_name} ${employee.last_name}`} />
      ))}
      

      <h3>Projects</h3>
      {projects.map((project) => (
        <ProjectBox
          key={project.id}
          id={project.id}
          project_name={project.project_name}
          employees={project.employees}
          moveEmployee={moveEmployee}
        />
        
      ))}
    </div>
  );
};

export default Scheduling;