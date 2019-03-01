import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      menuIsVisible: false
    }
  }

  toggleMenuVisible = () => {
    this.setState(prev => {
      return {menuIsVisible: !prev.menuIsVisible}
    })
  }

  handleMenuClick = () => {
    if (window.innerWidth <= 500) {
      this.setState({menuIsVisible: false})
    }
  }

  handleLogoutClick = (e) => {
    const btnId = e.target.id
    const { logoutUser, requestAuth } = this.props
    this.setState({menuIsVisible: false})
    return btnId === 'logout-btn' ? logoutUser() : requestAuth()
  }

  render () {
    const {currentUser} = this.props
    const button = (currentUser ? 
      <button id="logout-btn" className="header__logout" onClick={this.handleLogoutClick}>Log Out</button> :
      <button id="login-btn" className="header__logout" onClick={this.handleLogoutClick}>Register/Sign In</button>
    )
    return (
      <div className="Header">
        <div className="header__top-line">
          <h1 className="header__logo">Everyday Heroes</h1>
          <div className="header__menu-button">
            {
              this.state.menuIsVisible ? 
              <i className="fas fa-times fa-2x" onClick={this.toggleMenuVisible}></i> : 
              <i className="fas fa-bars fa-2x" onClick={this.toggleMenuVisible}></i>
            }
          </div>
        </div>
        <nav className={`header__nav ${this.state.menuIsVisible ? 'header__nav--visible' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item" onClick={this.toggleMenuVisible}><Link to="/progress">Progress</Link></li>
            <li className="header__nav-item" onClick={this.toggleMenuVisible}><Link to="/today">Today</Link></li>
          </ul>
          {button}
        </nav>
      </div>
    )
  }
}

export default Header