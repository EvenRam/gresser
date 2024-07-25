import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import JobDetails from "./JobDetails";

function JobList(props){

const jobs = useSelector(store => store.jobReducer)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch({ type: "FETCH_JOB"})
}, []);

return(
    <>
    <div>

        {/* <h2 className="table-title"> Job List:</h2> */}

        <table className="job-table">

            <thead>
                <tr>
                    <th>Job Number</th>
                    <th>Job Name</th>
                    <th>Location</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {!jobs || jobs.length === 0 || !Array.isArray(jobs) ? (
              <tr>
                <td colSpan="7">YOU HAVE NO JOBS</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <JobDetails key={job.job_id} job={job} />
              ))
            )}
          </tbody>


        </table>
    </div>
    </>
)
}
export default JobList