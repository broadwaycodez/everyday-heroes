import React from 'react'
import './Header.css'

const Header = ({currentUser, logoutUser}) => {
  return (
    <div className="Header">
      <h1>Header</h1>
      <button className="header__logout" onClick={logoutUser}>Log Out</button>
    </div>
  )
}

export default Header