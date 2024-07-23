import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
    const dispatch = useDispatch();
    const history = useHistory();
    const editEmployee = useSelector((store) => store.editEmployeeReducer);

    useEffect(() => {
        dispatch({ type: "FETCH_EMPLOYEE" });
    }, [dispatch]);

    const handleChange = (event, property) => {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: { property: property, value: event.target.value }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`/api/addemployee/${editEmployee.id}`, editEmployee)
            .then(response => {
                dispatch({ type: 'EDIT_CLEAR' });
                history.push('/addEmployee');
            })
            .catch(error => {
                console.log('Error on PUT: ', error);
            });
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <p>About to edit: {editEmployee.last_name} {editEmployee.first_name} with ID: {editEmployee.id}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Last Name
                        <input
                            type="text"
                            name="last_name"
                            value={editEmployee.last_name}
                            onChange={(event) => handleChange(event, 'last_name')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        First Name
                        <input
                            type="text"
                            name="first_name"
                            value={editEmployee.first_name}
                            onChange={(event) => handleChange(event, 'first_name')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Employee Number
                        <input
                            type="text"
                            name="employee_number"
                            value={editEmployee.employee_number}
                            onChange={(event) => handleChange(event, 'employee_number')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Union ID
                        <input
                            type="text"
                            name="union_id"
                            value={editEmployee.union_id}
                            onChange={(event) => handleChange(event, 'union_id')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Employee Status Active
                        <input
                            type="checkbox"
                            name="employee_status"
                            checked={editEmployee.employee_status === 1}
                            onChange={(event) => handleChange(event, 'employee_status')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number
                        <input
                            type="text"
                            name="phone_number"
                            value={editEmployee.phone_number}
                            onChange={(event) => handleChange(event, 'phone_number')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email
                        <input
                            type="text"
                            name="email"
                            value={editEmployee.email}
                            onChange={(event) => handleChange(event, 'email')}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <input
                            type="text"
                            name="address"
                            value={editEmployee.address}
                            onChange={(event) => handleChange(event, 'address')}
                        />
                    </label>
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
}

export default EditEmployee;