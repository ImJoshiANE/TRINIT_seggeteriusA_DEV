import { AvatarDemo } from './AvatarDemo'
import React from 'react'

const Info = ({tutor, tutorImg, sTime, duration}) => {
  return (
    <div className='flex justify-between items-center w-[30%]'>
        <AvatarDemo picPath={tutorImg} />
        <h3>{tutor}</h3>
        <p>{sTime}</p>
        <p>{duration}</p>
    </div>
  )
}

export default Info