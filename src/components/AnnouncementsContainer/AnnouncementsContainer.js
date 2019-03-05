import React from 'react'
import './AnnouncementsContainer.css'
import Announcement from '../Announcement/Announcement'

const AnnouncementsContainer = ({announcements, dismissAnnouncement}) => {
  const announcement = announcements[0]
  return (
    <div className="AnnouncementsContainer">
      <Announcement key={announcement.id} announcement={announcement} dismiss={dismissAnnouncement} />
    </div>
  )
}

export default AnnouncementsContainer