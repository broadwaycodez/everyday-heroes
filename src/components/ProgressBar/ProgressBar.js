import React from 'react'
import './ProgressBar.css'
import Utils from '../../utils/utils'

const ProgressBar = ({title, earned, required, streak}) => {
  const percent = Utils.getPercent(earned, required)
  console.log(streak)
  return (
    <div className="ProgressBar">
      <h4 className="progressBar__heading">{Utils.capitalize(title)}</h4>
      <div className="progressBar__holder">
        <div className="progressBar__meter-title">
          <div>{earned}/{required}</div>
          {streak && (
            <div className="progressBar__streak">Streak: {streak}</div>
          )}
        </div>
        <div className="progressBar__measurement" style={{width: `${percent}%`}}></div>
      </div>
    </div>
  )
}

export default ProgressBar