/*********************************************************************************
* WEB422 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: ____Elisa Ng Li__________________ Student ID: ____136265170__________ Date: ______Nov 1, 2019__________
*
********************************************************************************/
import React, { Component } from 'react'
import Overview from './Overview'
import Projects from './Projects'
import Teams from './Teams'
import Employees from './Employees'
import NotFound from './NotFound'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Overview />
        )} />
        <Route exact path='/Projects' render={() => (
          <Projects />
        )} />
        <Route exact path='/Teams' render={() => (
          <Teams />
        )} />
        <Route exact path='/Employees' render={() => (
          <Employees />
        )} />
        <Route render={() => (
          <NotFound />
        )} />
      </Switch>
    )
  }
}

export default App;
