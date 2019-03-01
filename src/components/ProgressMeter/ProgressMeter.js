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
        <div key={habit.habit_id} className="progressMeter__row">
          <h4>{Utils.capitalize(habit.habit)}</h4>
          <p>{habit.earned} points of {habit.required} ({percent}%)</p>
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