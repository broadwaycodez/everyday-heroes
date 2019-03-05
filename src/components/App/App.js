import React, { Component } from 'react'
import './App.css'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import Header from '../Header/Header'
import Main from '../Main/Main'
import Authorization from '../Authorization/Authorization'
import Queries from '../../API/queries'
import UserMessages from '../UserMessages/UserMessages'
import AnnouncementsContainer from '../AnnouncementsContainer/AnnouncementsContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: null,
      authVisible: false,
      authLeaving: false,
      errors: [],
      messages: [],
      announcements: [],
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

  displayMessages = (messages, errors) => {
    this.setState(prev => {
      if (messages) {
        messages.forEach(message => {
          prev.messages.push(message)
        })
      } 
      if (errors) {
        errors.forEach(error => {
          prev.errors.push(error)
        })
      }
      return prev
    })
  }

  dismissMessage = (message, error) => {
    this.setState(prev => {
      if (message) {
        const index = prev.messages.indexOf(message)
        prev.messages.splice(index, 1)
      }
      if (error) {
        const index = prev.errors.indexOf(error)
        prev.errors.splice(index, 1)
      }
      return prev
    })
  }

  setCurrentUser = async (auth_token, setLocal = true) => {
    if (setLocal) {
      localStorage.setItem("edhAuthToken", auth_token)
    }
    setAuthToken(auth_token)
    const decoded = jwt_decode(auth_token)
    const {user, errors} = await Queries.getUser(decoded.user_id)
    if (errors) {
      return this.displayMessages(null, errors)
    }
    await this.setState({
      currentUser: user,
    })
    this.dismissAuth()
    this.checkForAnnouncements()
  }

  updateCurrentUser = async () => {
    if (!this.state.currentUser) {
      return this.checkForAuthToken()
    }
    const { user, errors } = await Queries.getUser(this.state.currentUser.id)
    if (errors) {
      return this.displayMessages(null, errors)
    }
    await this.setState({
      currentUser: user,
    })
  }

  deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      return null
    }
    const data = await Queries.deleteAccount(this.state.currentUser.id)
    const {message, errors} = data
    if (errors) {
      return this.displayMessages(null, errors)
    }
    this.displayMessages([message], null)
    this.logoutUser()
  }

  checkForAnnouncements = async () => {
    const data = await Queries.getAnnouncements()
    const {announcements, errors} = data
    if (errors) {
      return this.displayMessages(null, errors)
    }
    this.setState({announcements})
  }

  dismissAnnouncement = announcementId => {
    this.setState(prev => {
      const index = prev.announcements.findIndex(announcement => {
        return announcement.id = announcementId
      })
      prev.announcements.splice(index, 1)
      return prev
    })
  }

  checkForAuthToken = () => {
    if (localStorage.edhAuthToken) {
      const auth_token = localStorage.edhAuthToken
      this.setCurrentUser(auth_token, false)
    } else {
      this.setState({authVisible: true})
    }
  }
  
  logoutUser = () => {
    localStorage.removeItem('edhAuthToken')
    setAuthToken(false)
    this.setState({
      currentUser: null,
      authVisible: true,
    })
    this.displayMessages(['You have been logged out.'], null)
  }

  componentDidMount() {
    this.checkForAuthToken()
  }

  render() {
    return (
      <div className="App">
        <UserMessages errors={this.state.errors} messages={this.state.messages} dismissMessage={this.dismissMessage} />
        <Header currentUser={this.state.currentUser} logoutUser={this.logoutUser} requestAuth={this.displayAuth} />
        {this.state.announcements.length > 0 && <AnnouncementsContainer announcements={this.state.announcements} dismissAnnouncement={this.dismissAnnouncement} />}
        { this.state.authVisible && <Authorization currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} dismiss={this.dismissAuth} leaving={this.state.authLeaving} displayMessages={this.displayMessages} /> }
        <Main currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} displayMessages={this.displayMessages} deleteAccount={this.deleteAccount} />
      </div>
    )
  }
}

export default App