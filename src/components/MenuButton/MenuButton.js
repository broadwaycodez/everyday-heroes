import React from 'react'
import './MenuButton.css'

const MenuButton = ({visible, toggle}) => {
  return (
  <div className={"MenuButton" +  (visible ? ' mb_open' : '')} onClick={toggle}>
    <div className="mb_line mb_line_1"></div>
    <div className="mb_line mb_line_2"></div>
    <div className="mb_line mb_line_3"></div>
  </div>
  )
}

export default MenuButton