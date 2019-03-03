import React from 'react'
import './Today.css'
import Queries from '../../API/queries'
import TaskList from '../TaskList/TaskList'
import ChallengesList from '../ChallengesList/ChallengesList'

class Today extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: null,
      challenges: null,
    }
  }

  getToday = async () => {
    const data = await Queries.getToday()
    const {tasks, challenges, errors} = data
    if (errors) {
      return this.props.displayMessages(null, errors)
    }
    this.setState({tasks, challenges})
  }

  componentDidMount() {
    window.scroll({top: 0, behavior: 'smooth'})
    this.getToday()
  }

  render() {
    return (
      <div className="Today">
        <TaskList tasks={this.state.tasks} />
        <ChallengesList challenges={this.state.challenges} />
      </div>
    )
  }
}

export default Today