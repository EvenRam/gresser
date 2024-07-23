import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';




const JobDetails = (props) => {

const dispatch =useDispatch();
const history = useHistory();

const jobs = useSelector(store => store.jobReducer)

const [status, setStatus] = useState('active')


const handleEdit = () => {
    dispatch({
        type: "SET_JOB", 
        payload: props.job
    });

    history.push('/edit');
}

const handleDelete = (jobId) => {
    console.log("Delete Clicked for job id:", jobId);
    dispatch({
        type: "DELETE_JOB",
        payload: { job_id: jobId }
    });
};
const toggleStatus = () => {
    setStatus(!status)
}

console.log("status", props.status)
return (
    <>
    <tr>
        <td> {props.job.job_number}</td>
        <td> {props.job.job_name}</td>
        <td> {props.job.location}</td>
        <td> {props.job.start_date}</td>
        <td> {props.job.end_date}</td>
        <td>
        <button className="job-toggle"  onClick={toggleStatus}>  {status ? 'Active' : 'Inactive'}
          
        </button>
      </td>

        <td> <button className="job-edit" onClick={()=> handleEdit(props.job.id)}>
            Edit</button> </td>
            <td> <button className="job-delete" onClick={()=> handleDelete(props.job.id)}>
            Delete</button> </td>
        

    </tr>
    </>
)

}

export default JobDetails;