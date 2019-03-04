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
      completed: null,
    }
  }

  getTask = async () => {
    const data = (
      this.props.taskId ?
      await Queries.getTask(this.props.taskId) :
      await Queries.getChallenge(this.props.challengeId)
    )
    const {errors} = data
    if (errors) {
      return this.props.displayMessages(null, errors)
    }
    const task = this.props.taskId ? data.task : data.challenge
    this.setState({task})
  }

  submitCompletion = async () => {
    const data = (
      this.props.taskId ? 
      await Queries.completeTask(this.state.task.id) :
      await Queries.completeChallenge(this.state.task.id)
    )
    const { completed, errors } = data
    if (errors) {
      return this.props.displayMessages(null, errors)
    }
    const message = (
      this.props.taskId ?
      `You have completed ${Utils.capitalize(this.state.task.habit_name)} for today!` :
      `You have completed ${this.state.task.title}`
    )
    this.props.displayMessages([message], null)
    this.setState({completed: completed})
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
      const back = this.props.taskId ? `/tasks/${habitId}` : `/challenges/${this.props.challengeId}`
      return (
        <div className="CompleteTask">
          <BackButton to={back} />
          <h2 className="main__page-title">Complete {Utils.capitalize(task.habit_name)}</h2>
          {this.props.taskId ? (
            <p>You have chosen to complete <strong>{task.title}</strong> for your <strong>{Utils.capitalize(task.habit_name)}</strong> task today.</p>
          ) : (
            <p>You are about to claim completion of <strong>{task.title}</strong>.</p>
          )}
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