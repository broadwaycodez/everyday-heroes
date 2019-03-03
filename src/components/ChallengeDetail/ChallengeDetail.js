import React from 'react'
import './ChallengeDetail.css'
import Queries from '../../API/queries'
import Utils from '../../utils/utils'

import BackButton from '../BackButton/BackButton'
import BottomButton from '../BottomButton/BottomButton'
import { Redirect } from 'react-router-dom'

class ChallengeDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      challenge: null,
      complete: false
    }
  }

  getChallengeInfo = async () => {
    const data = await Queries.getChallenge(this.props.challengeId)
    const {challenge, errors} = data
    if (errors) {
      return this.props.displayMessages(null, errors)
    }
    this.setState({challenge})
  }

  completeTask = () => {
    // this.setState({ complete: true })
  }

  componentDidMount() {
    window.scroll({top: 0, behavior: 'smooth'})
    this.getChallengeInfo()
  }

  render() {
    const challenge = this.state.challenge
    if (this.state.complete) {
      const challengeId = challenge.id
      return <Redirect to={`/challenges/${challengeId}/complete`} />
    }
    if (challenge) {
      const iframeWidth = Math.round(.9 * window.innerWidth)
      const iframeHeight = Math.round(iframeWidth * 9/16)
      const bonusPoints = (
        challenge.bonus_points ?
        challenge.bonus_points.map((bonus, i) => {
          return (
            <p key={bonus.id} className="challengeDetail__bonus-row">
              {Utils.capitalize(bonus.habit)}: {bonus.points}
            </p>
          )
        }) :
        null
      )
      return (
        <div className="ChallengeDetail">
          <BackButton to="/today" />
          <h2 className="main__page-title">{challenge.title}</h2>
          {challenge.embed_url && (
            <div className="challengeDetail__video">
              <iframe title={challenge.title} width={iframeWidth} height={iframeHeight} src={challenge.embed_url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          )}
          <div className="challengeDetail__content">
            {challenge.category === 'bonus' && (
              <div>
                <h3 className="challengeDetail__bonus-heading">Bonus Points</h3>
                {bonusPoints}
              </div>
            )}
            {challenge.description && (
              <div className="challengeDetail__description">
                {challenge.description}
              </div>
            )}
          </div>
          <BottomButton onClick={this.completeTask}>
            Mark As Completed
          </BottomButton>
        </div>
      )
    } else {
      return <h3 className="loading-text">Loading...</h3>
    }
  }
}

export default ChallengeDetail