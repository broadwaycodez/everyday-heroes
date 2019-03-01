import React from 'react'
import './CompleteTask.css'
import { Redirect } from 'react-router-dom'

import Queries from '../../API/queries'
import Utils from '../../utils/utils'

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
    this.getTask()
  }

  render() {
    if (this.state.completed) {
      return <Redirect to="/today" />
    }
    const task = this.state.task
    if (task) {
      return (
        <div className="CompleteTast">
          <h2>Complete {Utils.capitalize(task.habit_name)}</h2>
          <p>You have chosen to complete {task.title} for your {task.habit_name} task today.</p>
          <p>Please be sure you have completed all of the requirements, and then click the Submit button below.</p>
          <button onClick={this.submitCompletion}>Submit</button>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default CompleteTask