import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';



const JobDetails = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const jobs = useSelector(store => store.editJobReducer)
    console.log("edit job reducer", jobs)

    // define state for job status toogle 
    const [status, setStatus] = useState('')

    // dispatch action to update current state in redux
    const handleEdit = () => {
        dispatch({
            type: "SET_JOB",
            payload: props.job
        });
        // nav to the edit page
        history.push('/edit');
    }

    // Dispatch action to delete job with job id
    const handleDelete = () => {
        console.log("Delete Clicked for job id:", props.job.job_id);
        dispatch({
            type: "DELETE_JOB",
            payload: { jobid: props.job.job_id }
        });
    };

// toggles the job between active and inactive
const toggleStatus = () => {
    const newStatus = jobs.status === 'Active' ? 'Inactive' : 'Active';
console.log("new status", newStatus)
    dispatch({
    type: 'TOGGLE_JOB_STATUS',
    payload: { 
        jobid: props.job.job_id,
        status: newStatus,
     }

});

};

    return (
        <>
            <tr>
                <td> {props.job.job_number}</td>
                <td> {props.job.job_name}</td>
                <td> {props.job.location}</td>
                <td> {new Date(props.job.start_date).toLocaleDateString()}</td>
                <td> {new Date(props.job.end_date).toLocaleDateString()} </td>
                <td>
                <button className="job-toggle" onClick={toggleStatus}> 
                    {props.job.status === 'Active' ? 'Active' : 'Inactive'}
                    </button>
                </td>
                <td> <button className="job-edit" onClick={() => handleEdit(props.job.id)}>
                    Edit</button> </td>
                <td> <button className="job-delete" onClick={() => handleDelete(props.job.id)}>
                    Delete</button> </td>

            </tr>
        </>
    )
}
export default JobDetails;
