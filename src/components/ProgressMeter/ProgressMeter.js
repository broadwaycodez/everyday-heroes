import React from 'react'
import './ProgressMeter.css'
import Utils from '../../utils/utils'

const ProgressMeter = ({progress}) => {
  const habitList = (
    progress.sort((a,b) => {
      return a.habit_id - b.habit_id
    }).map(habit => {
      const percent = Utils.getPercent(habit.earned, habit.required)
      return (
        <div key={habit.habit_id} className="ProgressMeter">
          <h4 className="progressMeter__heading">{Utils.capitalize(habit.habit)}</h4>
          <div className="progressMeter__holder">
            <div className="progressMeter__meter-title">{habit.earned}/{habit.required}</div>
            <div className="progressMeter__measurement" style={{width: `${percent}%`}}></div>
          </div>
        </div>
      )
    })
  )

  return (
    <div className="ProgressMeter">
      {habitList}
    </div>
  )
}

export default ProgressMeter