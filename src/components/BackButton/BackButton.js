import React from 'react'
import './BackButton.css'
import { Link } from 'react-router-dom'

const BackButton = ({to}) => {
  return (
    <button className="BackButton">
      <Link to={to}><i className="fas fa-chevron-left"></i></Link>
    </button>
  )
}

export default BackButton