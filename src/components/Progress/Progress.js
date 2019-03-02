import React from 'react'
import './Progress.css'
import Queries from '../../API/queries'

import ProgressMeter from '../ProgressMeter/ProgressMeter'

class Progress extends React.Component {
  constructor() {
    super()
    this.state = {
      progress: null,
      level_num: null,
      errors: null,
    }
  }

  getProgressData = async () => {
    const {points, level_num, errors} = await Queries.getProgress(this.props.currentUser.id)
    if (errors) {
      return this.setState({errors})
    }
    const progress = points
    this.setState({progress, level_num})
  }

  componentDidMount() {
    this.getProgressData()
  }

  render() {
    const progress = this.state.progress
    const levelNum = this.state.level_num
    return (
      <div className="Progress">
      <h2 className="main__page-title">Level {levelNum} Progress</h2>
      { progress ? <ProgressMeter progress={progress} /> : <div>Loading...</div> }
      </div>
    )
  }
}

export default Progress