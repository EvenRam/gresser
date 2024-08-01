import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from './Employee';
import { useDispatch, useSelector } from 'react-redux';
const ProjectBox = ({ id, employees, email, phoneNumber, address, moveEmployee, project_name }) => {
  // console.log('Project Box Employees for ', project_name, " => ", employees);
  // console.log('Project Box employee id', id)
  console.log('Id in project box:', id)
  console.log("Employees in ProjectBox component:", employees)
  // console.log('Index:', employees[1].id)
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
  // console.log('Employees:', employees);
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
      <h4>{project_name}</h4>
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
