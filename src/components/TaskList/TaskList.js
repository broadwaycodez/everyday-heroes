import React from 'react'
import './TaskList.css'

import DailyTask from '../DailyTask/DailyTask'

const TaskList = ({tasks}) => {
  const dailyTasks = (
    tasks ?
    tasks.map(task => {
      return <DailyTask key={task.habit_id} task={task} />
    }) :
    <h3>Loading...</h3>
  )
  return (
    <div className="TaskList">
      {dailyTasks}     
    </div>
  )
}

export default TaskList