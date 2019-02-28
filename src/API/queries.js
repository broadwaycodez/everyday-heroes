import axios from 'axios'

const Queries = {
  async getToday() {
    try {
      const res = await axios.get('/today')
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getHabitInfo(habit_id) {
    try {
      const res = await axios.get(`/today/${habit_id}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  }
}

export default Queries