import React from 'react'
import './UserMessages.css'
import MessageRow from './MessageRow'

const UserMessages = ({errors, messages, dismissMessage}) => {
  const allMessages = (
    messages ? 
    messages.map((message, i) => {
      return (
        <MessageRow key={i} message={message} dismiss={dismissMessage} />
      )
    }) :
    null
  )
  const allErrors = (
    errors ? 
    errors.map((error, i) => {
      return (
        <MessageRow key={i} error={error} dismiss={dismissMessage} />
      )
    }) :
    null
  )
  return (
    <div className="UserMessages">
      {allMessages}
      {allErrors}
    </div>
  )
}

export default UserMessages