import React from 'react'
import './Profile.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
import BottomButton from '../BottomButton/BottomButton'

const Profile = ({currentUser, displayMessages}) => {
  const startDate = moment(currentUser.created_at).format('MMMM Do[,] YYYY')
  return (
    <div className="Profile">
      <h2 className="main__page-title">Profile</h2>
      <p>Screen Name: {currentUser.screen_name}</p>
      <p>Level {currentUser.level_id}: <Link className="profile__inline-link" to="/progress">View Progress</Link></p>
      <p>Member Since: {startDate}</p>
      <BottomButton linkTo="/profile/edit">Edit Your Profile</BottomButton>
    </div>
  )
}

export default Profile