import React from 'react'
import './EditProfile.css'
import BackButton from '../BackButton/BackButton'
import Validate from '../../utils/validation'
import Auth from '../../API/auth';
import { Redirect } from 'react-router-dom'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    const {currentUser} = props
    this.state = {
      first_name: currentUser.first_name,
      last_name: currentUser.last_name,
      email: currentUser.email,
      screen_name: currentUser.screen_name,
      errors: {},
      done: false
    }
  }

  onFormSubmit = async e => {
    e.preventDefault()
    const user = {
      id: this.props.currentUser.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      screen_name: this.state.screen_name,
    }
    const { isValid, errors } = Validate.update(user)
    if (!isValid) {
      return this.setState({ errors })
    }
    const data = await Auth.update(user)
    if (data.errors) {
      return this.setState({
        errors: data.errors,
      })
    }
    if (data.user) {
      this.props.displayMessages(["Your account has been updated."], null)
      this.props.updateCurrentUser()
      this.setState({ done: true })
    }
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  handleCancel = e => {
    e.preventDefault()
    this.setState({done: true})
  }

  render() {
    if (this.state.done) {
      return <Redirect to="/profile" />
    }
    const errors = this.state.errors
    return (
      <div className="EditProfile">
        <BackButton to="/profile" />

        <h2 className="main__page-title">Edit Profile</h2>

        <form className="editProfile__form" onSubmit={this.onFormSubmit}>
          <div className="editProfile__form-row">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" placeholder={errors.first_name} value={this.state.first_name} onChange={this.handleChange} />
          </div>
          <div className="editProfile__form-row">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" placeholder={errors.last_name} value={this.state.last_name} onChange={this.handleChange} />
          </div>
          <div className="editProfile__form-row">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder={errors.email} value={this.state.email} onChange={this.handleChange} />
          </div>
          <div className="editProfile__form-row">
            <label htmlFor="screen_name">Screen Name</label>
            <input type="text" name="screen_name" placeholder={errors.screen_name} value={this.state.screen_name} onChange={this.handleChange} />
          </div>
          <div className="editProfile__buttons">
            <button type="submit" className="editProfile__submit">Submit</button>
            <button className="editProfile__cancel" type="cancel" onClick={this.handleCancel}>Cancel</button>
          </div>
        </form>
        <hr className="editProfile__hr" />
        <div className="editProfile__buttons">
          <button type="delete" className="editProfile__delete">Close Your account</button>
        </div>
      </div>
    )
  }
}

export default EditProfile