import React from 'react'
import './Today.css'
import Queries from '../../API/queries'
import TaskList from '../TaskList/TaskList'

class Today extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: null,
    }
  }

  getToday = async () => {
    const data = await Queries.getToday()
    const {today_tasks, errors} = data
    if (errors) {
      return this.props.displayMessages(null, errors)
    }
    this.setState({tasks: today_tasks})
  }

  componentDidMount() {
    window.scroll({top: 0, behavior: 'smooth'})
    this.getToday()
  }

  render() {
    return (
      <div className="Today">
        <h2 className="main__page-title">Today</h2>
        <TaskList tasks={this.state.tasks} />
      </div>
    )
  }
}

export default Today