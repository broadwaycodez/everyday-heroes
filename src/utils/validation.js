const Validate = {
  register(user) {
    const errors = {}
    const minimumPswdChars = 8
    for (let key in user) {
      if (!user[key]) {
        errors[key] = `${formNames[key]} is required`
      }
      if (key === 'password') {
        if (user[key].length < minimumPswdChars ) {
          errors[key] = `${formNames[key]} must be at least ${minimumPswdChars} characters long.`
        }
      }
    }
    if (user.password !== user.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match.'
    }
    return sendResponse(errors)
  },

  login(email, password) {
    const errors = {}
    if (!email) {
      errors.email = "Email is required"
    }
    if (!password) {
      errors.password = "Password is required"
    }
    return sendResponse(errors)
  }
}

const sendResponse = errors => {
  const isValid = Object.keys(errors).length === 0
  return {isValid, errors}
}

const formNames = {
  email: 'Email',
  first_name: "First Name",
  last_name: "Last Name",
  screen_name: "Screen Name",
  password: "Password",
  password_confirmation: "Password Confirmation"
}

export default Validate