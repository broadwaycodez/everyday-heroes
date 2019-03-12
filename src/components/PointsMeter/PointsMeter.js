import React from 'react'
import './PointsMeter.css'
import ProgressBar from '../ProgressBar/ProgressBar'

const PointsMeter = ({points}) => {
  const habitList = (
    points.sort((a,b) => {
      return a.habit_id - b.habit_id
    }).map(habit => {
      return (
        <ProgressBar key={habit.habit_id} title={habit.habit} earned={habit.earned} streak={habit.streak} required={habit.required} />
      )
    })
  )

  return (
    <div className="PointsMeter">
      {habitList}
    </div>
  )
}

export default PointsMeter