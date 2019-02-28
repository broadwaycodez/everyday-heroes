import React from 'react'
import './Today.css'

import TaskList from '../TaskList/TaskList'

class Today extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="Today">
        <h1>Today</h1>
        <TaskList />
      </div>
    )
  }
}

export default Today