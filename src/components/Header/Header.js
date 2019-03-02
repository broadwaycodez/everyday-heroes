import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import MenuButton from '../MenuButton/MenuButton'

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
    const menuIsVisible = this.state.menuIsVisible
    const button = (currentUser ? 
      <button id="logout-btn" className="header__logout" onClick={this.handleLogoutClick}>Log Out</button> :
      <button id="login-btn" className="header__logout" onClick={this.handleLogoutClick}>Register/Sign In</button>
    )
    return (
      <div className="Header-wrapper">
        <div className="Header">
          <div className="header__top-line">
            <h1 className="header__logo">Everyday Heroes</h1>
            <MenuButton visible={menuIsVisible} toggle={this.toggleMenuVisible} />
          </div>
          <nav className={`header__nav ${menuIsVisible ? 'header__nav--visible' : ''}`}>
            <ul className="header__nav-list">
              <li className="header__nav-item" onClick={this.toggleMenuVisible}><Link to="/progress">Progress</Link></li>
              <li className="header__nav-item" onClick={this.toggleMenuVisible}><Link to="/today">Today</Link></li>
            </ul>
            {button}
          </nav>
        </div>
      </div>
    )
  }
}

export default Header