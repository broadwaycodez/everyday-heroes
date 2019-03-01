import React from 'react'
import './TaskDetail.css'
import { Link } from 'react-router-dom'
import { SegmentedControl } from 'segmented-control'
import { Redirect } from 'react-router-dom'

import Queries from '../../API/queries'
import Utils from '../../utils/utils'

class TaskDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      habit: null,
      tasks: null,
      taskIndex: 0,
      errors: null,
      complete: false,
      alreadyCompleted: false
    }
  }

  getHabitInfo = async () => {
    const data = await Queries.getHabitInfo(this.props.habitId)
    const {habit, tasks, errors} = data
    this.setState({habit, tasks, errors})
  }

  getCompletedTask = async () => {
    const data = await Queries.getAlreadyCompleted(this.props.habitId)
    const { completed, message, errors } = data
    if (errors) {
      return this.setState({errors})
    }
    if (completed) {
      this.setState({alreadyCompleted: true})
    }
  }

  handleSelectChange = (newValue) => {
    this.setState({ taskIndex: newValue })
  }

  completeTask = () => {
    this.setState({ complete: true })
  }

  componentDidMount() {
    this.getCompletedTask()
    this.getHabitInfo()
  }

  render() {
    if (this.state.complete) {
      const taskId = this.state.tasks[this.state.taskIndex].id
      return <Redirect to={`/tasks/${taskId}/complete`} />
    }
    const habit = this.state.habit
    if (habit) {
      const selectedTask = this.state.tasks[this.state.taskIndex]
      const taskOptions = this.state.tasks.map((task, i) => {
        const isDefault = i === this.state.taskIndex ? true : false
        return (
          {label: task.element, value: i, default: isDefault}
        )
      })
      return (
        <div className="TaskDetail">
          <div><Link to="/today">Back</Link></div>
          <h2>{Utils.capitalize(habit.name)}</h2>
          {this.state.alreadyCompleted ? (
            <h3>You have already completed {Utils.capitalize(habit.name)} today</h3>
          ) : (
            <h3>Select one of the following essential elements to complete today:</h3>
          )}
          <SegmentedControl
            className="taskDetail__segmented" 
            name="elementSelector" 
            options={taskOptions} 
            setValue={newValue => this.handleSelectChange(newValue)} 
          />
          <div key={selectedTask.id}>
            <p>{selectedTask.element}</p>
            <p>{selectedTask.title}</p>
            <p>{selectedTask.description}</p>
          </div>  
          { !this.state.alreadyCompleted && (
            <button className="taskDetail__completed" onClick={this.completeTask}>
              Mark As Completed
            </button>
          )}
        </div>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default TaskDetail