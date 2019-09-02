import axios from 'axios';
import URL from './apiLocacation';

const Queries = {
  async getUser(userId) {
    try {
      const res = await axios.get(`${URL}/users/${userId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getToday() {
    try {
      const res = await axios.get(`${URL}/today`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getHabitInfo(habit_id) {
    try {
      const res = await axios.get(`${URL}/today/${habit_id}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getAlreadyCompleted(habitId) {
    try {
      const res = await axios.get(`${URL}/today/assignments/${habitId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getTask(task_id) {
    try {
      const res = await axios.get(`${URL}/tasks/${task_id}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async completeTask(taskId) {
    try {
      const res = await axios.post(`${URL}/assignments`, {daily_task_id: taskId})
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getChallenge(challengeId) {
    try {
      const res = await axios.get(`${URL}/challenges/${challengeId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async completeChallenge(challengeId) {
    try {
      const res = await axios.post(`${URL}/challenges`, {challenge_id: challengeId})
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getProgress(userId) {
    try {
      const res = await axios.get(`${URL}/users/${userId}/progress`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async deleteAccount(userId) {
    try {
      const res = await axios.delete(`${URL}/users/${userId}`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
  async getAnnouncements() {
    try {
      const res = await axios.get(`${URL}/announcements`)
      return res.data
    } catch (e) {
      return {errors: [e.message]}
    }
  },
}

export default Queries