import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import JobList from './JobList';
import './CreateJobs.css'

const CreateJobs = () => {
// hook to dispatch actions
    const dispatch = useDispatch();
    const history = useHistory();

    const jobs = useSelector(store => store.jobReducer)

    // state variables defines for input fields
    const [jobNumber, setJobNumber] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('')

// Handle form submission 
    const handleSubmit = (event) => {
        // Prevent default form submission
        event.preventDefault();
        // Dispatch action to add job
        dispatch({
            type: 'ADD_JOB',
            payload: {
                job_number: jobNumber,
                job_name: name,
                location: location,
                start_date: startDate,
                end_date: endDate,
                status: status
            }

        })
        // clear form fields
        setJobNumber("");
        setName("");
        setLocation("");
        setStartDate("");
        setEndDate("");

    }

    

    return (
        <>
            <h2 className='jobs-title'>Add Job</h2>

            <form className='jobs-form' onSubmit={handleSubmit}>

                <div className='job-id'>
                   
                    <input className='job-Number' 
                    placeholder='Job Number'
                        type='number'
                        id='jobid'
                        value={jobNumber}
                        onChange={(event) => setJobNumber(event.target.value)}
                    />
                  
                     
                        
                    <input className='job-name'
                    placeholder='Job Name'
                        type='text'
                        id='jobname'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                
                
                        
                    <input className='job-location'
                    placeholder='Location'
                        type='location'
                        id='joblocation'
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
               

                    <label className='date-start'
                        htmlFor='date-start'> Start Date: </label>
                    <input
                        type='date'
                        id='startdate'
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                

                    <label className='date-end'
                        htmlFor='date-end'> End Date: </label>
                    <input
                        type='date'
                        id='enddate'
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
            

                    <button className='job-button' onClick={handleSubmit}>Submit</button>
                </div>
            </form>

            <JobList />
        </>
    )

}

export default CreateJobs;