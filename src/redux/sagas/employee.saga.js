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

  export default function* rootSaga() {
    yield takeLatest('FETCH_EMPLOYEE_INFO', fetchEmployeeInfo);
    yield takeLatest('ADD_EMPLOYEE_INFO', addEmployeeInfo)
  }