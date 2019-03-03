import axios from 'axios'

const Queries = {
  async getUser(userId) {
    try {
      const res = await axios.get(`/users/${userId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
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
  },
  async getAlreadyCompleted(habitId) {
    try {
      const res = await axios.get(`/today/assignments/${habitId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getTask(task_id) {
    try {
      const res = await axios.get(`/tasks/${task_id}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async completeTask(taskId) {
    try {
      const res = await axios.post(`/assignments`, {daily_task_id: taskId})
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getChallenge(challengeId) {
    try {
      const res = await axios.get(`/challenges/${challengeId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getProgress(userId) {
    try {
      const res = await axios.get(`/users/${userId}/progress`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  }
}

export default Queries