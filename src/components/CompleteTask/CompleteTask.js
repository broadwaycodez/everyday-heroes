import React from 'react'
import './CompleteTask.css'
import { Redirect } from 'react-router-dom'
import BottomButton from '../BottomButton/BottomButton'

import Queries from '../../API/queries'
import Utils from '../../utils/utils'
import BackButton from '../BackButton/BackButton';

class CompleteTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task: null,
      errors: null,
      completed: null,
    }
  }

  getTask = async () => {
    const data = await Queries.getTask(this.props.taskId)
    const {task, errors} = data
    if (errors) {
      return this.setState({errors})
    }
    this.setState({task})
  }

  submitCompletion = async () => {
    const { completed_assignment, errors } = await Queries.completeTask(this.state.task.id)
    if (errors) {
      return this.setState({errors})
    }
    this.setState({completed: completed_assignment})
  }

  componentDidMount() {
    window.scroll({top: 0, behavior: 'smooth'})
    this.getTask()
  }

  render() {
    if (this.state.completed) {
      return <Redirect to="/today" />
    }
    const task = this.state.task
    const habitId = this.props.habitId
    if (task) {
      return (
        <div className="CompleteTask">
          <BackButton to={`/tasks/${habitId}`} />
          <h2 className="main__page-title">Complete {Utils.capitalize(task.habit_name)}</h2>
          <p>You have chosen to complete <strong>{task.title}</strong> for your <strong>{Utils.capitalize(task.habit_name)}</strong> task today.</p>
          <p>Please be sure you have completed all of the requirements, and then click the Submit button below.</p>
          <BottomButton onClick={this.submitCompletion}>Submit</BottomButton>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default CompleteTask