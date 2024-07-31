import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { DndProvider } from 'react-dnd';


import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddEmployee from '../AddEmployee/AddEmployee';
import EditEmployee from '../AddEmployee/EditAddEmployee';
import CreateJobs from '../CreateJobs/CreateJobs';
import EditForm from '../CreateJobs/EditForm';
import JobHistory from '../JobHistory/JobHistory';
import DragDrop from '../SaveDrag/SaveDrag';
import Scheduling from '../Scheduling/Scheduling';
import Trades from '../Scheduling/Trades';




import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route exact path="/about">
            <AboutPage />
          </Route>

          <ProtectedRoute exact path="/user">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? <Redirect to="/user" /> : <LoginPage />}
          </Route>

          <Route exact path="/registration">
            {user.id ? <Redirect to="/user" /> : <RegisterPage />}
          </Route>

          <Route exact path="/home">
            {user.id ? <Redirect to="/user" /> : <LandingPage />}
          </Route>

          <Route exact path="/jobs">
            <CreateJobs />
          </Route>

          <Route exact path="/edit" component={EditForm} />

          <Route exact path="/addemployee">
            <AddEmployee />
          </Route>

          <ProtectedRoute exact path="/editemployee">
            <EditEmployee />
          </ProtectedRoute>

          <Route exact path="/jobhistory">
            <JobHistory /> 
          </Route>


          



          <Route exact path="/drag">
            <DndProvider backend={HTML5Backend}>
              <DragDrop />
            </DndProvider>
          </Route>

<Route exact path="/scheduling">
            <DndProvider backend={HTML5Backend}>
              <Scheduling />
              <Trades />
            </DndProvider>
          </Route>
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
