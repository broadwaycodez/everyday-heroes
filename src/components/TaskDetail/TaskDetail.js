import React from 'react'
import './TaskDetail.css'
import { Link } from 'react-router-dom'

import Queries from '../../API/queries'

class TaskDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      habit: null,
      tasks: null,
      errors: null
    }
  }

  getHabitInfo = async () => {
    const data = await Queries.getHabitInfo(this.props.habitId)
    const {habit, tasks, errors} = data
    this.setState({habit, tasks, errors})
  }

  componentDidMount() {
    this.getHabitInfo()
  }

  render() {
    const habit = this.state.habit
    if (habit) {
      const allTasks = this.state.tasks.map(task => {
        return (
          <div key={task.id}>
            <p>{task.element}</p>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>  
        )
      })
      return (
        <div className="TaskDetail">
          <h1>Today's tasks for {habit.name}</h1>
          <Link to="/today">Back</Link>
          {allTasks}
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