import React from 'react'
import './Main.css'

import { Switch, Route, Redirect } from 'react-router-dom'
import Today from '../Today/Today'
import Progress from '../Progress/Progress'
import TaskDetail from '../TaskDetail/TaskDetail'
import CompleteTask from '../CompleteTask/CompleteTask'

const Main = ({currentUser, setCurrentUser}) => {
  return (
    <div className="Main">
      <Switch>
        <Route path="/" exact render={ props => {
          if (currentUser) {
            return <Redirect to="/today" />
          } else {
            return "Please sign in or create an account"
          }
        }}/>
        <Route path="/today" render={ () => {
          if (currentUser) {
            return <Today currentUser={currentUser} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/progress" render={ () => {
          if (currentUser) {
            return <Progress currentUser={currentUser} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/tasks" exact render={() => {
          return <Redirect to="/today" />
        }} />
        <Route path="/tasks/:habitId" exact render={ props => {
          if (currentUser) {
            const habitId = props.match.params.habitId
            return <TaskDetail habitId={habitId} />
          } else {
            return <Redirect to="/" />
          }
        }} />
        <Route path="/tasks/:habitId/complete/:taskId" render={ props => {
          if (currentUser) {
            const taskId = props.match.params.taskId
            const habitId = props.match.params.habitId
            return <CompleteTask taskId={taskId} habitId={habitId} />
          } else {
            return <Redirect to="/" />
          }
        }} />
      </Switch>
    </div>
  )
}

export default Main