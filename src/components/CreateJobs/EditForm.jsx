import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const EditForm = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const editJob = useSelector((store) => store.editReducer)

    function handleNumberChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'job_number',
                value: event.target.value,
            }
        })
    }

    function handleNameChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'job_name',
                value: event.target.value,
            }
        })
    }

    function handleLocationChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'location',
                value: event.target.value,
            }
        })
    }

    function handleStartDate(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'start_date',
                value: event.target.value,
            }
        })
    }

    function handleEndDate(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'end_date',
                value: event.target.value,
            }
        })
    }

    function handleStatus(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'status',
                value: event.target.value,
            }
        })
    }


    function handleSubmit(event) {
        event.preventDefault();

        console.log("edit job", editJob.job_id);

        axios.put(`/api/jobs/${editJob.job_id}`, editJob)
            .then(response => {
                dispatch({ type: "EDIT_CLEAR" });
                history.push('/jobs');
            })
            .catch(error => {
                console.log('error on Put', error);
            })
    };

   
    return (
        <>
            <h2 className='edit-job'> Edit Job </h2>

            <p className='to=edit'> About to Edit {editJob.job_name}</p>
            {console.log('edit job', editJob)}

            <form className='edit-form'
                onSubmit={handleSubmit}>

                <div className='job-Numer'>
                    <input
                        placeholder='Job Number'
                        onChange={(event) => handleNumberChange(event)}
                        value={editJob.job_number}
                    />
                </div>

                <div className='name'>
                    <input
                        placeholder='Job Name'
                        value={editJob.job_name}
                        onChange={(event) => handleNameChange(event)}
                    />
                </div>

                <div className='location'>
    
                    <input
                        placeholder='Location'
                        value={editJob.location}
                        onChange={(event) => handleLocationChange(event)}
                    />
                </div>


                <div className='startdate'>
                    <input
                        placeholder='Start Date'
                        type='date'
                        value={editJob.start_date}
                        onChange={(event) => handleStartDate(event)}
                    />
                </div>

                <div className='enddate'>
                    <input
                        placeholder=' End Date'
                        type='date'
                        value={editJob.end_date}
                        onChange={(event) => handleEndDate(event)}
                    />
                </div>


                {/* <div className='status'>

                    <label className='job-status'
                        htmlFor='status'> Status: </label>
                    <input
                        placeholder='Status'
                        value={editJob.status}
                        onChange={(event) => handleStatus(event)}
                    />

                </div> */}

                <input className="update-button" type='submit' value='Update Job' />

            </form>

        </>
    )
}

export default EditForm