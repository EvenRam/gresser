import React from 'react';
import { useDrop } from 'react-dnd';
import Employee from '../Scheduling/Employee';
import { useDispatch, useSelector } from 'react-redux';

const UnionBox = ({ id, employees, moveEmployee, union_name }) => {
  console.log('NAME in union box:', union_name);
  console.log('Employees in UnionBox component:', employees);

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
        width: '250px',
        minHeight: '150px',
        margin: '10px',
        padding: '10px',
        backgroundColor: isOver ? '#f0f0f0' : '#fff',
      }}
    >
      <h4>{union_name}</h4>
      {employees.length === 0 ? (
        <p>No employees assigned</p>
      ) : (
        employees.map(employee => (
          <Employee key={employee.id} id={employee.id} name={`${employee.first_name} ${employee.last_name}`} />
        ))
      )}
    </div>
  );
};

export default UnionBox;
