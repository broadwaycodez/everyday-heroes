import React from 'react'
import './DailyTask.css'
import { Link } from 'react-router-dom'
import Utils from '../../utils/utils'

const DailyTask = ({task}) => {
  return (
    <div className="DailyTask">
      <div className="dailyTask__complete"><Link to={`/tasks/${task.habit_id}`}>{task.complete ? '✅' : '❌'}</Link></div>
      <h3 className="dailyTask__title">{Utils.capitalize(task.habit_name)}</h3>
    </div>
  )
}

export default DailyTask