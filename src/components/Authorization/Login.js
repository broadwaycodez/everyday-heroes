import React from 'react'
import './Authorization.css'
import Validate from '../../utils/validation'
import Auth from '../../API/auth'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {},
      working: false,
      guestSignIn: false,
    }
  }

  signIn = async () => {
    const credentials = this.state.guestSignIn ? ['guest@ichoosetobeahero.com', 'guestguest'] : [this.state.email, this.state.password]
    const signInData = await Auth.signIn(...credentials)
    const {auth_token, errors} = signInData
    if (errors) {
      return this.handleErrros(errors)
    }
    this.props.setCurrentUser(auth_token)
  }

  signInGuest = async () => {
    await this.setState({
      guestSignIn: true
    })
    this.signIn()
  }

  handleGuestClick = e => {
    this.signInGuest()
  }

  onFormSubmit = async e => {
    e.preventDefault()
    if (this.state.working) {
      return null
    }
    await this.setState({working: true})
    this.validateLogin()
  }

  validateLogin = () => {
    const {isValid, errors} = Validate.login(this.state.email, this.state.password)
    if (!isValid) {
      return this.handleErrros(errors)
    }
    this.signIn()
  }

  handleErrros = errors => {
    const errorsArray = []
    for (let key in errors) {
      errorsArray.push(errors[key])
    }
    this.props.displayMessages(null, errorsArray)
    this.setState({
      errors: errors,
      working: false
    })
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value })
  }

  render() {
    const errors = this.state.errors
    return (
      <div className="Login">
        <h1 className="authorization__heading">Welcome, Hero!</h1>
        {errors.user_authentication && <div className="authorization__error-message">{errors.user_authentication}</div>}
        <form className="authorization__form" onSubmit={this.onFormSubmit}>
          <div className="authorization__form-row">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder={errors.email} />
          </div>
          <div className="authorization__form-row">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder={errors.password} />
          </div>
          <button className="authorization__submit">Sign in!</button>
        </form>
        <hr />
        <div className="authorization__switch">
          <h3 className="authorization__sub-heading">Don't have an account?</h3>
          <div className="authorization__switch-btns" >
            <button className="authorization__switch-btn" onClick={this.props.switchScreen}>Sign up now!</button>
            -OR-
            <button className="authorization__switch-btn" onClick={this.handleGuestClick}>Browse as Guest</button>
          </div>
        </div>
      </div>    
    )
  }
}

export default Login