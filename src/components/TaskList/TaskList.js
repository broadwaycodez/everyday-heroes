import React from 'react'
import './TaskList.css'

import DailyTask from '../DailyTask/DailyTask'

const TaskList = ({tasks}) => {
  const dailyTasks = (
    tasks ?
    tasks.map(task => {
      return <DailyTask key={task.habit_id} task={task} />
    }) :
    []
  )
  return tasks && tasks.length > 0 ? (
    <div className="TaskList">
      <h2 className="main__page-title">Your Daily Heroic Habits</h2>
      <div className="taskList__wrapper">
        {dailyTasks}     
      </div>
    </div>
  ) :
  null
}

export default TaskList