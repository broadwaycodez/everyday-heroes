import React from 'react'
import './DailyTask.css'
import { Link } from 'react-router-dom'
import Utils from '../../utils/utils'

const DailyTask = ({task, challenge}) => {
  return task ? (
    <div className="DailyTask">
      <div className="dailyTask__complete"><Link to={`/tasks/${task.habit_id}`}>{task.complete ? '✅' : '❌'}</Link></div>
      <h3 className="dailyTask__title">{Utils.capitalize(task.habit_name)}</h3>
    </div>
  ) :
  (
    <div className="DailyTask">
      <div className="dailyTask__complete"><Link to={`/challenges/${challenge.id}`}>{challenge.complete ? '✅' : '❌'}</Link></div>
      <h3 className="dailyTask__title">{Utils.capitalize(challenge.title)}</h3>
    </div>
  )
}

export default DailyTask