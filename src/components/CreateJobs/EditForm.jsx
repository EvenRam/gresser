import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const EditForm = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const editJob = useSelector((store) => store.editJobReducer)

    function handleChange(event, property) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: property,
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
                        onChange={(event) => handleChange(event, 'job_number',)}
                        value={editJob.job_number}
                    />
                </div>
                <div className='name'>
                    <input
                        placeholder='Job Name'
                        value={editJob.job_name}
                        onChange={(event) => handleChange(event, 'job_name')}
                    />
                </div>
                <div className='location'>

                    <input
                        placeholder='Location'
                        value={editJob.location}
                        onChange={(event) => handleChange(event, 'location')}
                    />
                </div>

                <div className='startdate'>
                    <input
                        placeholder='Start Date'
                        type='date'
                        value={editJob.start_date}
                        onChange={(event) => handleChange(event, 'start_date')}
                    />
                </div>
                <div className='enddate'>
                    <input
                        placeholder=' End Date'
                        type='date'
                        value={editJob.end_date}
                        onChange={(event) => handleChange(event, 'end_date')}
                    />
                </div>

                <input className="update-button" type='submit' value='Update Job' />
            </form>
        </>
    )
}
export default EditForm