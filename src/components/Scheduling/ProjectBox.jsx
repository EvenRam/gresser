import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from './Employee';
import { useDispatch, useSelector } from 'react-redux';

const ProjectBox = ({ id, employees, moveEmployee, job_name }) => {
  console.log('Id in job box:', id)
  console.log("Employees in JobBox component:", employees)
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EMPLOYEE',
    drop: (item) => {
      console.log('Dropped item:', item);
      moveEmployee(item.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: '1px solid gray',
        width: '200px',
        minHeight: '100px',
        margin: '10px',
        padding: '10px',
        backgroundColor: isOver ? 'white' : 'white',
      }}
    >
      <h4>{job_name}</h4>
      {employees.length === 0 ? (
        <p>No employees assigned</p>
      ) : (
        employees.map(employees => (
          <Employee
            key={employees.id}
            id={employees.id}
            name={`${employees.first_name} ${employees.last_name}`}
            number={`${employees.phone_number}`}
            email={`${employees.email}`}
            address={`${employees.address}`} />
        ))
      )}
    </div>
  );
};

export default ProjectBox;