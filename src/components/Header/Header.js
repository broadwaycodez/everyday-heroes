import React from 'react'
import './Header.css'

const Header = ({currentUser, logoutUser, requestAuth}) => {
  const button = (currentUser ? 
    <button className="header__logout" onClick={logoutUser}>Log Out</button> :
    <button className="header__logout" onClick={requestAuth}>Register/Sign In</button>
  )
  return (
    <div className="Header">
      <h1>Header</h1>
      {button}
    </div>
  )
}

export default Header