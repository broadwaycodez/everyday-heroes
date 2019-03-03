import React from 'react'
import './ChallengesList.css'
import DailyTask from '../DailyTask/DailyTask'

const ChallengesList = ({challenges}) => {
  const allChallenges = (
    challenges ?
    challenges.map(challenge => {
      return <DailyTask key={challenge.id} challenge={challenge} />
    }) :
    []
  )
  return challenges ? (
    <div className="ChallengesList">
      <h2 className="main__page-title">Your Challenges</h2>
      <div className="challengesList__wrapper">
        { allChallenges }
      </div>
    </div>
  ) :
  null
}

export default ChallengesList