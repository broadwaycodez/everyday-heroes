import React from 'react'
import './TaskList.css'

import DailyTask from '../DailyTask/DailyTask'

const TaskList = ({tasks}) => {
  return (
    <div className="TaskList">
      <h1>TaskList</h1>
      <DailyTask />
    </div>
  )
}

export default TaskList