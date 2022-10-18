import React, { useContext, useRef } from 'react'
import Context from '../context/stateContext'
import useClickOutside from '../hooks/useClickOutside'
import { SignIn, SignUp, Profile } from '../components'
import { AiFillCloseCircle } from 'react-icons/ai'

export const UserContainer = () => {
    const wrapperRef = useRef(null)
    const { 
      showUser,
      setShowUser,
      currentUser,
      profile,
      setProfile 
    } = useContext(Context)
    useClickOutside(wrapperRef, ()=>{
        setShowUser(false)
        setProfile(currentUser ? 'profile' : 'sign-in')
    })

  return (
    <div className={`inset-0 bg-[#000a] z-10 ${showUser ? 'fixed' : 'hidden'}`}>
        <div ref={wrapperRef} className='absolute w-full sm:w-[540px] right-0 bg-[#fefefe] top-0 bottom-0 shadow-md p-4 overflow-scroll'>
            <AiFillCloseCircle className='ml-auto cursor- mb-8' size={40} onClick={()=>{
                setShowUser(false)
                setProfile(currentUser ? 'profile' : 'sign-in')
            }}/>
           <div className='min-h-[80%] flex items-center'>
             {profile === 'sign-in' && <SignIn {...{setProfile}} />}
             {profile === 'sign-up' && <SignUp {...{setProfile}} />}
             {profile === 'profile' && <Profile {...{setProfile}} />}
           </div>
        </div>
    </div>
  )
}