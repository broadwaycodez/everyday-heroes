import React, { Component } from 'react'
import './App.css'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Authorization from '../Authorization/Authorization'
import Queries from '../../API/queries'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      authVisible: false,
      authLeaving: false,
      errors: null,
    }
  }

  displayAuth = () => {
    this.setState({authVisible: true})
  }

  dismissAuth = async () => {
    await this.setState({
      authLeaving: true,
    })
    setTimeout(() => {
      this.setState({
        authVisible: false,
        authLeaving: false,
      })
    }, 600)
  }

  setCurrentUser = async (auth_token, setLocal = true) => {
    if (setLocal) {
      localStorage.setItem("brianToken", auth_token)
    }
    setAuthToken(auth_token)
    const decoded = jwt_decode(auth_token)
    const {user, errors} = await Queries.getUser(decoded.user_id)
    if (errors) {
      return this.setState({errors})
    }
    await this.setState({
      currentUser: user,
    })
    this.dismissAuth()
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
    this.setState({
      currentUser: null,
      authVisible: true,
    })
  }

  componentDidMount() {
    this.checkForAuthToken()
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} logoutUser={this.logoutUser} requestAuth={this.displayAuth} />
        { this.state.authVisible && <Authorization currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} dismiss={this.dismissAuth} leaving={this.state.authLeaving} /> }
        <Main currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
      </div>
    )
  }
}

export default App