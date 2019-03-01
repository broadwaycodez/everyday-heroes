import React from 'react'
import './TaskDetail.css'
import { Link } from 'react-router-dom'
import { SegmentedControl } from 'segmented-control'
import { Redirect } from 'react-router-dom'

import Queries from '../../API/queries'

class TaskDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      habit: null,
      tasks: null,
      taskIndex: 0,
      errors: null,
      complete: false
    }
  }

  getHabitInfo = async () => {
    const data = await Queries.getHabitInfo(this.props.habitId)
    const {habit, tasks, errors} = data
    this.setState({habit, tasks, errors})
  }

  handleSelectChange = (newValue) => {
    this.setState({ taskIndex: newValue })
  }

  completeTask = () => {
    this.setState({ complete: true })
  }

  componentDidMount() {
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
          <h1>Today's tasks for {habit.name}</h1>
          <div><Link to="/today">Back</Link></div>
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
          <button className="taskDetail__completed" onClick={this.completeTask}>
            Mark As Completed
          </button>
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