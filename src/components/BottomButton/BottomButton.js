import React from 'react'
import './BottomButton.css'
import { Link } from 'react-router-dom'

const BottomButton = ({children, linkTo, onClick}) => {
  const button = <button className="BottomButton" onClick={onClick}>{children}</button>
  if (linkTo) {
    return (
      <Link to={linkTo} className="bottomButton__link">
        {button}
      </Link>
    )
  }
  return (
    button
  )
}

export default BottomButton