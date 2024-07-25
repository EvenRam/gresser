import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import JobList from './JobList';
import './CreateJobs.css'

const CreateJobs = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const jobs = useSelector(store => store.jobReducer)

    const [jobNumber, setJobNumber] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [status, setStatus] = useState('true')


    const handleSubmit = (event) => {
        event.preventDefault();

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

        setJobNumber("");
        setName("");
        setLocation("");
        setStartDate("");
        setEndDate("");

    }

    

    return (
        <>
            <h2 className='jobs-title'>Adding Jobs:</h2>

            <form className='jobs-form' onSubmit={handleSubmit}>

                <div className='job-id'>
                    <label className='job-Number' htmlFor='Number'> Job Number:</label>
                    <input
                        type='number'
                        id='jobid'
                        value={jobNumber}
                        onChange={(event) => setJobNumber(event.target.value)}
                    />
                    {/* </div> */}

                    {/* <div className='name'> */}
                    <label className='job-name'
                        htmlFor='job-name'> Job Name: </label>
                    <input
                        type='text'
                        id='jobname'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    {/* </div> */}

                    {/* <div className='location'> */}
                    <label className='job-location'
                        htmlFor='job-location'> Location:</label>
                    <input
                        type='location'
                        id='joblocation'
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                    />
                </div>


                <div className='startdate'>

                    <label className='date-start'
                        htmlFor='date-start'> Start Date: </label>
                    <input
                        type='date'
                        id='startdate'
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                    />
                    {/* </div> */}

                    {/* <div className='enddate'> */}

                    <label className='date-end'
                        htmlFor='date-end'> End Date: </label>
                    <input
                        type='date'
                        id='enddate'
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    {/* </div> */}


                    {/* <div className='status'> */}

                    {/* <label className='job-status'
                        htmlFor='status'> Status: </label>
                    <input
                        type='text'
                        id='status'
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    /> */}

                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>

            <JobList />
        </>
    )

}

export default CreateJobs;