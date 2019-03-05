import axios from 'axios'

const URL = 'https://everyday-heroes-api.herokuapp.com'

const Auth = {
  async register(newUser) {
    try {
      const res = await axios.post(`${URL}/users`, {user: newUser})
      return res.data
    } catch (e) {
      return {server_error: e.message}
    }
  },

  async signIn(email, password) {
    try {
      const res = await axios.post(`${URL}/authenticate`, {email, password})
      return res.data
    } catch (e) {
      return {server_error: e.message}
    }
  },

  async update(user) {
    try {
      const res = await axios.put(`/users/${user.id}`, user)
      return res.data
    } catch (e) {
      return {server_error: e.message}
    }
  },
}

export default Auth