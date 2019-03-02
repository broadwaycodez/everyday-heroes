import React from 'react'
import './TaskDetail.css'
import { SegmentedControl } from 'segmented-control'
import { Redirect } from 'react-router-dom'
import BottomButton from '../BottomButton/BottomButton'
import BackButton from '../BackButton/BackButton'

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
      alreadyCompleted: false,
      transitioning: false,
    }
  }

  getHabitInfo = async () => {
    const data = await Queries.getHabitInfo(this.props.habitId)
    const {habit, tasks, errors} = data
    this.setState({habit, tasks, errors})
  }

  getCompletedTask = async () => {
    const data = await Queries.getAlreadyCompleted(this.props.habitId)
    const { completed, errors } = data
    if (errors) {
      return this.setState({errors})
    }
    if (completed) {
      this.setState({alreadyCompleted: true})
    }
  }

  handleSelectChange = async (newValue) => {
    setTimeout(() => {
      this.setState({ 
        taskIndex: newValue,
        transitioning: false,
       })
    }, 400)
  }

  completeTask = () => {
    this.setState({ complete: true })
  }

  componentDidMount() {
    this.getCompletedTask()
    this.getHabitInfo()
  }

  render() {
    const habit = this.state.habit
    if (this.state.complete) {
      const taskId = this.state.tasks[this.state.taskIndex].id
      const habitId = this.props.habitId
      return <Redirect to={`/tasks/${habitId}/complete/${taskId}`} />
    }
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
          <BackButton to="/today" />
          <h2 className="main__page-title">{Utils.capitalize(habit.name)}</h2>
          {this.state.alreadyCompleted ? (
            <h3 className="taskDetail__sub-heading">You have already completed {Utils.capitalize(habit.name)} today</h3>
          ) : (
            <h3 className="taskDetail__sub-heading">Select one of the following essential elements to complete today:</h3>
          )}
          <SegmentedControl
            className="taskDetail__segmented" 
            name="elementSelector" 
            options={taskOptions} 
            setValue={newValue => this.handleSelectChange(newValue)} 
          />
          <div className="taskDetail__content" key={selectedTask.id}>
            <p className="taskDetail__p">{selectedTask.title}</p>
            <p className="taskDetail__p">{selectedTask.description}</p>
          </div>  
          { !this.state.alreadyCompleted && (
            <BottomButton onClick={this.completeTask}>
              Mark As Completed
            </BottomButton>
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