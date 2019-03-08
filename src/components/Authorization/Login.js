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
    }
  }

  signIn = async () => {
    try {
      const signInData = await Auth.signIn(this.state.email, this.state.password)
      const {auth_token, errors} = signInData
      if (errors) {
        const errorsArray = []
        for (let key in errors) {
          errorsArray.push(errors[key])
        }
        this.props.displayMessages(null, errorsArray)
        return this.setState({errors})
      }
      this.props.setCurrentUser(auth_token)
    } catch (e) {
      console.log(e.message)
    }
  }

  onFormSubmit = e => {
    e.preventDefault()
    const {isValid, errors} = Validate.login(this.state.email, this.state.password)
    if (!isValid) {
      const errorsArray = []
      for (let key in errors) {
        errorsArray.push(errors[key])
      }
      this.props.displayMessages(null, errorsArray)
      return this.setState({ errors })
    }
    this.signIn()
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
        <div className="authorization__switch">
          <button className="authorization__switch-btn" onClick={this.props.switchScreen}>Don't have an account?</button>
        </div>
      </div>    
    )
  }
}

export default Login