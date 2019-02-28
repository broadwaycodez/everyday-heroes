import React from 'react'
import './DailyTask.css'
import { Link } from 'react-router-dom'

const DailyTask = ({task}) => {
  return (
    <div className="DailyTask">
      <Link to={`/tasks/${task.habit_id}`}>
        <h3>{task.habit_name}</h3>
        <h4>Complete: {task.complete ? 'true': 'false'}</h4>
      </Link>
    </div>
  )
}

export default DailyTask