import React from 'react'
import './Announcement.css'

class Announcement extends React.Component {
  constructor() {
    super()
    this.state = {
      leaving: false,
    }
  }
  
  handleDismiss = async () => {
    await this.setState({leaving: true})
    setTimeout(() => {
      this.props.dismiss(this.props.announcement.id)
    }, 600)
  }

  render() {
    const leavingClass = this.state.leaving ? ' announcement--leaving' : ''
    const {announcement} = this.props
    return (
      <div className={"Announcement" + leavingClass}>
        <div className="announcement__dismiss"><i className="fas fa-times" onClick={this.handleDismiss}></i></div>
        <h2 className="announcement__heading">{announcement.title}</h2>
        <div className="announcement__content" dangerouslySetInnerHTML={{__html: announcement.content}} />
      </div>
    )
  }
}

export default Announcement