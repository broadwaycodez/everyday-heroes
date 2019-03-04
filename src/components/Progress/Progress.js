import React from 'react'
import './Progress.css'
import Queries from '../../API/queries'
import { Redirect } from 'react-router-dom'

import PointsMeter from '../PointsMeter/PointsMeter'
import ProgressBar from '../ProgressBar/ProgressBar'
import BottomButton from '../BottomButton/BottomButton'

class Progress extends React.Component {
  constructor() {
    super()
    this.state = {
      points: null,
      challenges: null,
      level_num: null,
      errors: null,
      redirect: false
    }
  }

  redirectToToday = () => {
    this.setState({redirect: true})
  }

  getProgressData = async () => {
    const {points, challenges, level_num, errors} = await Queries.getProgress(this.props.currentUser.id)
    if (errors) {
      return this.setState({errors})
    }
    this.setState({points, challenges, level_num})
  }

  componentDidMount() {
    window.scroll({top: 0, behavior: 'smooth'})
    this.getProgressData()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/today" />
    }
    const points = this.state.points
    const challenges = this.state.challenges
    const levelNum = this.state.level_num
    return (
      <div className="Progress">
        <h2 className="main__page-title">Level {levelNum} Progress</h2>
        { points ? <PointsMeter points={points} /> : null }
        { challenges ? <ProgressBar title="Required Challenges" earned={challenges.earned} required={challenges.required} /> : null}
        <BottomButton onClick={this.redirectToToday}>View Today's Tasks</BottomButton>
      </div>
    )
  }
}

export default Progress