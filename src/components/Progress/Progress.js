import React from 'react'
import './Progress.css'

import ProgressMeter from '../ProgressMeter/ProgressMeter'

const Progress = props => {
  return (
    <div className="Progress">
      <h1>Progress</h1>
      <ProgressMeter />
    </div>
  )
}

export default Progress