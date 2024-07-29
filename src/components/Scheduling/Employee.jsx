import React from 'react';
import { useDrag } from 'react-dnd';

const Employee = ({ id, name }) => {
  console.log('Employee ID:', id); 
  console.log('Employee Name:', name);
  console.log()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EMPLOYEE',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        border: '1px solid white',
        cursor: 'move',
        backgroundColor: 'white',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {name}
    </div>
  );
};

export default Employee;