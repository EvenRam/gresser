import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./AddEmployee.css"
import ToggleEmployee from './ToggleEmployee';


const AddEmployee = (props) => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.addEmployeeReducer);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [unionName, setUnionName] = useState(''); 

    // const [employeeStatus, setEmployeeStatus] = useState(true);

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

            union_name: unionName,
            phone_number: phoneNumber,
            email,
            address
        };
        dispatch({ type: 'ADD_EMPLOYEE_INFO', payload: newEmployee });

        // Clear the form
        setFirstName('');
        setLastName('');
        setEmployeeNumber('');
        setUnionName('');
        setPhoneNumber('');
        setEmail('');
        setAddress('');
    };

    const handleEditClick = (emp) => {


        dispatch({ type: 'SET_EDIT_EMPLOYEE', payload: emp });
        history.push('/editemployee');
    };

    return (
        <>
            <h2 className='employee-title'>Add Employee</h2>

            <form className='employee-inputs' onSubmit={handleSubmit}>
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
<div>
            <label htmlFor="union_name">Select Union:</label>
            <select
                id="union_name"
                name="union_name"
                value={unionName}
                onChange={(event) => setUnionName(event.target.value)}
            >
                <option value="" disabled>Select a union</option>
                <option value="21 - Bricklayers">21 - Bricklayers</option>
                <option value="22 - Cement Masons/Finishers">22 - Cement Masons/Finishers</option>
                <option value="23 - Laborers">23 - Laborers</option>
                <option value="24 - Operators">24 - Operators</option>
                <option value="25 - Carpenters">25 - Carpenters</option>
            </select>
        </div>



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
                <button className="employee-button" type="submit">Add Employee</button>
            </form>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Employee Number</th>
                        <th>Union</th>

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
                            <td>{emp.union_name}</td>
                            <td>
                                <ToggleEmployee
                                    emp={emp} />
                            </td>
                            <td>{emp.phone_number}</td>
                            <td>{emp.email}</td>
                            <td>{emp.address}</td>
                            <td><button className='employee-editbtn' onClick={() => handleEditClick(emp)}>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default AddEmployee;

