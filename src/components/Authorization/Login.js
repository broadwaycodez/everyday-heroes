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
    if (this.props.currentUser) {
      return <div>You are already logged in.</div>
    }
    return (
      <div className="Login">
        <h1>Sign In</h1>
        {errors.user_authentication && <div className="login__error-message">{errors.user_authentication}</div>}
        <form className="login__form" onSubmit={this.onFormSubmit}>
          <div className="login__form-row">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            {errors.email && <div className="login__error-message">{errors.email}</div>}
          </div>
          <div className="login__form-row">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            {errors.password && <div className="login__error-message">{errors.password}</div>}
          </div>
          <button className="login__submit">Sign in!</button>
        </form>
        {/*<Link to="/register">Need to create an account?</Link> */}
      </div>    
    )
  }
}

export default Login