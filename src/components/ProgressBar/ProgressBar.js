import React from 'react'
import './ProgressBar.css'
import Utils from '../../utils/utils'

const ProgressBar = ({title, earned, required}) => {
  const percent = Utils.getPercent(earned, required)
  return (
    <div className="ProgressBar">
      <h4 className="progressBar__heading">{Utils.capitalize(title)}</h4>
      <div className="progressBar__holder">
        <div className="progressBar__meter-title">{earned}/{required}</div>
        <div className="progressBar__measurement" style={{width: `${percent}%`}}></div>
      </div>
    </div>
  )
}

export default ProgressBar