import React from 'react'
import './BottomButton.css'

const BottomButton = ({children, onClick}) => {
  return (
    <button className="BottomButton" onClick={onClick}>{children}</button>
  )
}

export default BottomButton