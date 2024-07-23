import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.addEmployeeReducer);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [unionId, setUnionId] = useState('');
    const [employeeStatus, setEmployeeStatus] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const history = useHistory();
    useEffect(() => {
        dispatch({ type: 'FETCH_EMPLOYEE_INFO' });
    }, [dispatch]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEmployee = {
            first_name: firstName,
            last_name: lastName,
            employee_number: employeeNumber,
            union_id: unionId,
            employee_status: employeeStatus,
            phone_number: phoneNumber,
            email,
            address
        };
        dispatch({ type: 'ADD_EMPLOYEE_INFO', payload: newEmployee });

        // Clear the form
        setFirstName('');
        setLastName('');
        setEmployeeNumber('');
        setUnionId('');
        setEmployeeStatus(0);
        setPhoneNumber('');
        setEmail('');
        setAddress('');
    };


    const handleEditClick = (emp) => {
      
        dispatch({ type: 'SET_EDIT_EMPLOYEE', payload: emp });

        // Push user to edit page
        history.push('/editemployee');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                           <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <input
                    type="text"
                    name="employee_number"
                    placeholder="Employee Number"
                    value={employeeNumber}
                    onChange={(event) => setEmployeeNumber(event.target.value)}
                />
                <input
                    type="text"
                    name="union_id"
                    placeholder="Union ID"
                    value={unionId}
                    onChange={(event) => setUnionId(event.target.value)}
                />
                <label>
                    Employee Status Active
                    <input
                        type="checkbox"
                        name="employee_status"
                        checked={employeeStatus === 1}
                        onChange={(event) => setEmployeeStatus(event.target.checked ? 1 : 0)}
                    />
                </label>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <button type="submit">Add Employee</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Employee Number</th>
                        <th>Union ID</th>
                        <th>Employee Status</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.last_name}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.employee_number}</td>
                            <td>{emp.union_id}</td>
                            <td>{emp.employee_status === true ? '1' : '0'}</td>
                            <td>{emp.phone_number}</td>
                            <td>{emp.email}</td>
                            <td>{emp.address}</td>
                            <td><button onClick={() => handleEditClick(emp)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddEmployee;