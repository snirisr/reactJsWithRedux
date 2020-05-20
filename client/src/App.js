import React from 'react';
import './App.css';
import Vacations from './components/Vacations';
import Login from './components/Login';
import AdminDashboard  from "./components/AdminDashboard";
import {connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Register from './components/Register';
import Chart from './components/Chart'
import Page404 from './components/Page404';



function App(props) {


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component = {Login} />
          <Route path="/vacations" component = {Vacations} />
          <Route path="/admin" component = {AdminDashboard} />
          <Route path="/register" component = {Register} />
          <Route path="/reports" component ={Chart} />
          <Redirect from="/" to="/vacations" exact />
          <Route path="*" component = {Page404} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      loggedUser: state.auth,
      vacations: state.getAllVacations
  }
}

export default connect(mapStateToProps)(App)