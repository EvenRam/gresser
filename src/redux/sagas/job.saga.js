import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* jobSaga() {
    yield takeLatest ('FETCH_JOB', fetchJob);
    yield takeLatest ('ADD_JOB', addJob);
    yield takeLatest("DELETE_JOB",deleteJob);

  }
  
function* fetchJob() {
    try {
        const jobResponse = yield axios.get('/api/jobs')
        console.log('jobResponse', jobResponse.data)
        yield put({ type: 'SET_JOB', payload: jobResponse.data })
    } catch (error) {
        console.log('error with the job fetch request, error')
    }

}


        

function* addJob(action) {
    console.log("Inside addJob", action.payload);
    try {
        yield axios.post('/api/jobs', action.payload);
        yield put({
            type: "SET_JOB",
            payload: action.payload  
        });
        yield put({ type: 'FETCH_JOB'})
    } catch (error) {
        console.log('error with add job post request', error);
    }
}

function* deleteJob(action){
    try{
        console.log("action.payload.id:",action.payload.jobs_id);
        yield axios.delete(`/api/jobs/${action.payload.jobs_id}`);
        yield put({type: "FETCH_JOB"})
    } catch(error){
        console.log("Error with the Job delete request", error)
    }
}

export default jobSaga;