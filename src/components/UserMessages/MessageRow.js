import React from 'react'
import './UserMessages.css'

const MessageRow = ({message, error, dismiss}) => {
  const rowClassName = "MessageRow" + (error ? " messageRow--error" : " messageRow--message")
  return (
    <div className={rowClassName}>
      <div>{message || error}</div>
      <div className="messageRow__dismiss"><i className="fas fa-times"></i></div>
    </div>
  )
}

export default MessageRow