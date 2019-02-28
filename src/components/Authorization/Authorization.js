import React from 'react'
import './Authorization.css'

import Login from './Login'
import Register from './Register'

class Authorization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeScreen: 'register',
    }
  }

  switchScreen = () => {
    this.setState(prev => {
      const activeScreen = prev.activeScreen === 'register' ? 'login' : 'register'
      return { activeScreen }
    })
  }

  render() {
    const activeScreen = this.state.activeScreen === 'register' ? <Register {...this.props} /> : <Login {...this.props} />
    const buttonText = this.state.activeScreen === 'register' ? 'Already a member?' : "Don't have an account?"
    const leaving = this.props.leaving
    return (
      <div className={'Authorization-wrapper' + (leaving ? ' Authorization-wrapper--leaving' : '')}>
        <div className="Authorization">
          <div className="authorization__dismiss" onClick={this.props.dismiss}>X</div>
          { activeScreen }
          <div className="authorization__switch">
            <button className="authorization__switch-btn" onClick={this.switchScreen}>{buttonText}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Authorization