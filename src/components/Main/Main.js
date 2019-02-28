import React from 'react'
import './Main.css'

import { Switch, Route, Redirect } from 'react-router-dom'
import Today from '../Today/Today'
import Progress from '../Progress/Progress'
import TaskDetail from '../TaskDetail/TaskDetail';

const Main = props => {
  return (
    <div className="Main">
      <h1>Main</h1>
      <Switch>
        <Route path="/today" render={ props => {
          return <Today />
        }} />
        <Route path="/progress" render={ props => {
          return <Progress />
        }} />
        <Route path="/task/:id" render={ props => {
          const taskId = props.match.params.id
          return <TaskDetail taskId={taskId} />
        }} />
      </Switch>
    </div>
  )
}

export default Main