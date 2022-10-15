import React, { useContext } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { AuthContext } from '../context/authContext'

export const Profile = () => {
  const { currentUser, userSignOut } = useContext(AuthContext)

  const handleSignOut = () => {
    userSignOut()
  }
  return (
    <div className='w-full'>
      <div className='flex gap-2 justify-end mr-4'>
        <AiOutlineUser size={24}/>
        <span className='text-[rebeccapurple] font-medium text-xl'>{currentUser.displayName}</span>
      </div>

      <button className='btn btn-ghost ml-auto block' type='button' onClick={handleSignOut}>Sign Out</button>
    </div>

  )
}
