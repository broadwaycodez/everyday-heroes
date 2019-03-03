import React from 'react'
import './UserMessages.css'

class MessageRow extends React.Component {
  constructor() {
    super()
    this.timeout = null
    this.state = {
      dismissing: false
    }
  }

  dismiss = async () => {
    await this.setState({dismissing: true})
    setTimeout(() => {
      this.props.dismiss(this.props.message, this.props.error)
    }, 300)
  }

  componentDidMount() {
    const time = this.props.error ? 5000 : 3000
    this.timeout = setTimeout(() => {
      this.dismiss()
    }, time)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const {message, error} = this.props
    const rowClassName = (
      "MessageRow" + 
      (error ? " messageRow--error" : " messageRow--message") +
      (this.state.dismissing ? " messageRow--dismissing" : "")
    )
    return (
      <div className={rowClassName}>
        <div>{message || error}</div>
        <div className="messageRow__dismiss" onClick={this.dismiss}><i className="fas fa-times"></i></div>
      </div>
    )
  }
}

export default MessageRow