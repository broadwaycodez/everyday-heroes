import React from 'react'
import './Profile.css'
import moment from 'moment'
import { Link } from 'react-router-dom'
import BottomButton from '../BottomButton/BottomButton'

const Profile = ({currentUser, displayMessages}) => {
  const startDate = moment(currentUser.created_at).format('MMMM Do[,] YYYY')
  return (
    <div className="Profile">
      <h2 className="main__page-title">My Profile</h2>
      <div className="profile__content">
        <h3 className="profile__sub-heading">Public Profile</h3>
        <p><strong>Screen Name:</strong> {currentUser.screen_name}</p>
        <p><strong>Level {currentUser.level_id}:</strong> <Link className="profile__inline-link" to="/progress">View Progress</Link></p>
        <p><strong>Member Since:</strong> {startDate}</p>
        <hr className="profile__hr" />
        <h3 className="profile__sub-heading">Private Account Information</h3>
        <p><strong>Full Name:</strong> {currentUser.first_name} {currentUser.last_name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>
      <BottomButton linkTo="/profile/edit">Edit Your Profile</BottomButton>
    </div>
  )
}

export default Profile