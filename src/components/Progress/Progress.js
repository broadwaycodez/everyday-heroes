import React from 'react'
import './Progress.css'
import Queries from '../../API/queries'

import ProgressMeter from '../ProgressMeter/ProgressMeter'

class Progress extends React.Component {
  constructor() {
    super()
    this.state = {
      progress: null,
      errors: null,
    }
  }

  getProgressData = async () => {
    const {points, errors} = await Queries.getProgress(this.props.currentUser.id)
    if (errors) {
      return this.setState({errors})
    }
    const progress = points
    this.setState({progress})
  }

  componentDidMount() {
    this.getProgressData()
  }

  render() {
    const progress = this.state.progress
    return (
      <div className="Progress">
      <h2 className="main__page-title">Progress</h2>
      { progress ? <ProgressMeter progress={progress} /> : <div>Loading...</div> }
      </div>
    )
  }
}

export default Progress