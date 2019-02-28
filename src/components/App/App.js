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
      currentUser: null
    }
  }

  setCurrentUser = (auth_token, setLocal = true) => {
    if (setLocal) {
      localStorage.setItem("brianToken", auth_token)
    }
    setAuthToken(auth_token)
    const decoded = jwt_decode(auth_token)
    this.setState({
      currentUser: decoded.user_id
    })
  }

  checkForAuthToken = () => {
    if (localStorage.brianToken) {
      const auth_token = localStorage.brianToken
      this.setCurrentUser(auth_token, false)
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
        {`Current User: ${this.state.currentUser}`}
        <Header currentUser={this.state.currentUser} logoutUser={this.logoutUser} />
        <Authorization currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
        <Main currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
      </div>
    )
  }
}

export default App