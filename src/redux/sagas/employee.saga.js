import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEmployeeInfo() {
    try {
      const response = yield call(axios.get, '/api/addemployee');
      yield put({ type: 'SET_EMPLOYEE_INFO', payload: response.data });
    } catch (error) {
      console.error('Error fetching employee information:', error);
    }
  }
  function* addEmployeeInfo(action) {
    try {
      yield call(axios.post, '/api/addemployee', action.payload);
      yield put({ type: 'FETCH_EMPLOYEE_INFO' });
    } catch (error) {
      console.error('Error adding employee information:', error);
    }
  }
  
  function* fetchEmployeeCard() {
    try {
      const response = yield call(axios.get, '/api/addemployee/employeecard');
      yield put({ type: 'SET_EMPLOYEE_CARD', payload: response.data });
    } catch (error) {
      console.error('Error fetching employee information:', error);
    }
  }

  function* fetchProject() {
    try {
      const response = yield call(axios.get, '/api/project');
      yield put({ type: 'SET_PROJECTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  
  // Add Project
  function* addProject(action) {
    try {
      yield call(axios.post, '/api/project', { project_name: action.payload.project_name });
      yield put({ type: 'FETCH_PROJECT' });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  }

  function* fetchProjectsWithEmployees() {
    try {
      const response = yield call(axios.get, '/api/project/withEmployees');
      console.log("Response for fetchProjectsWithEmployees", response.data)
      yield put({ type: 'SET_PROJECTS_WITH_EMPLOYEES', payload: response.data });
    } catch (error) {
      console.error('Error fetching projects with employees:', error);
    }
  }


  function* handleMoveEmployee(action) {
    try {
      const { employeeId, targetProjectId } = action.payload;
      // console.log('Reducer received:', employeeId, targetProjectId);
      yield call(axios.post, '/api/moveEmployee', { employeeId, targetProjectId });
      yield put({ type: 'FETCH_PROJECTS_WITH_EMPLOYEES'});
      yield put({ type: 'FETCH_EMPLOYEE_CARD' });
  
    } catch (error) {
      yield put({ type: 'MOVE_EMPLOYEE_FAILURE', error }); 
    }
  }

  function* fetchEmployeeUnion() {
    try {
      const response = yield call(axios.get, '/api/addemployee/union');
      yield put({ type: 'SET_EMPLOYEE_UNION', payload: response.data });
    } catch (error) {
      console.error('Error fetching employee union information:', error);
    }
  }

  function* fetchUnionsWithEmployees() {
    try {
      const response = yield call(axios.get, '/api/addemployee/withunions');
      console.log("Response for fetchProjectsWithEmployees", response.data)
      yield put({ type: 'SET_EMPLOYEE_WITH_UNION', payload: response.data });
    } catch (error) {
      console.error('Error fetching union with employees:', error);
    }
  }

  export default function* rootSaga() {
    yield takeLatest('FETCH_EMPLOYEE_INFO', fetchEmployeeInfo);
    yield takeLatest('ADD_EMPLOYEE_INFO', addEmployeeInfo)
    yield takeLatest('FETCH_EMPLOYEE_CARD', fetchEmployeeCard)
    yield takeLatest('FETCH_PROJECTS_WITH_EMPLOYEES', fetchProjectsWithEmployees);
    yield takeLatest('MOVE_EMPLOYEE', handleMoveEmployee)
    yield takeLatest('FETCH_EMPLOYEE_UNION', fetchEmployeeUnion)
    yield takeLatest('FETCH_UNIONS_WITH_EMPLOYEES', fetchUnionsWithEmployees);
  }