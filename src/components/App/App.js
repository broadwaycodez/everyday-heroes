import React, { Component } from 'react'
import './App.css'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Authorization from '../Authorization/Authorization'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      authVisible: false,
    }
  }

  displayAuth = () => {
    this.setState({authVisible: true})
  }

  dismissAuth = () => {
    this.setState({authVisible: false})
  }

  setCurrentUser = (auth_token, setLocal = true) => {
    if (setLocal) {
      localStorage.setItem("brianToken", auth_token)
    }
    setAuthToken(auth_token)
    const decoded = jwt_decode(auth_token)
    this.setState({
      currentUser: decoded.user_id,
      authVisible: false
    })
  }

  checkForAuthToken = () => {
    if (localStorage.brianToken) {
      const auth_token = localStorage.brianToken
      this.setCurrentUser(auth_token, false)
    } else {
      this.setState({authVisible: true})
    }
  }
  
  logoutUser = () => {
    localStorage.removeItem('brianToken')
    setAuthToken(false)
    this.setState({currentUser: null})
  }

  componentDidMount() {
    this.checkForAuthToken()
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} logoutUser={this.logoutUser} requestAuth={this.displayAuth} />
        { this.state.authVisible && <Authorization currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} dismiss={this.dismissAuth} /> }
        <Main currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
      </div>
    )
  }
}

export default App