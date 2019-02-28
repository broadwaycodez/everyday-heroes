import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = ({currentUser, logoutUser, requestAuth}) => {
  const button = (currentUser ? 
    <button className="header__logout" onClick={logoutUser}>Log Out</button> :
    <button className="header__logout" onClick={requestAuth}>Register/Sign In</button>
  )
  return (
    <div className="Header">
      <h1>Header</h1>
      <nav>
        <ul>
          <li><Link to="/today">Today</Link></li>
          <li><Link to="/progress">Progress</Link></li>
        </ul>
        {button}
      </nav>
    </div>
  )
}

export default Header