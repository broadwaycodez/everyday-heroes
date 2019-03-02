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
    const props = {...this.props, switchScreen : this.switchScreen}
    const activeScreen = this.state.activeScreen === 'register' ? <Register {...props} /> : <Login {...props} />
    const leaving = this.props.leaving
    return (
      <div className={'Authorization-wrapper' + (leaving ? ' Authorization-wrapper--leaving' : '')}>
        <div className="Authorization">
          { activeScreen }
        </div>
      </div>
    )
  }
}

export default Authorization