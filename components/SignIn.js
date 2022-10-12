import React, { useEffect, useRef, useContext } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineRightCircle, AiFillGoogleSquare, AiFillCloseCircle } from 'react-icons/ai'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { AuthContext } from '../context/authContext'
export const SignIn = ({setProfile}) => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const regEx = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/, //(?=.*[!@#$%^&*])
  }

  const { signIn, currentUser, showPassword, setShowPassword, googleSignUp } = useContext(AuthContext)

  useEffect(()=>{
    currentUser && setProfile('profile')
    setShowPassword(false)
  }, [currentUser]) //eslint-disable-line

  const handleSignIn = async () => {
    if(!regEx.email.test(emailRef.current.value)){
      toast.error('Enter a valid email')
      return
    }
    if(!regEx.password.test(passwordRef.current.value)){
        toast.error('Incorrect password')
        return
    }
    try {
      await signIn(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
        toast.error((err.toString()).includes('wrong') && 'Wrong credentials entered, try again')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignUp()
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <div className='w-full flex-1 flex justify-center items-center'>
        <div className='w-[98%] md:w-[80%]'>
            <form className='flex flex-col gap-5'>
                <input ref={emailRef} type="email" placeholder="Email" className="border-[2px] border-black p-3" />
                <div className="border-[2px] border-black flex items-center pr-2 mb-5">
                    <input 
                        ref={passwordRef}
                        type={`${showPassword ? 'text' : 'password'}`} 
                        placeholder="Password" 
                        className='w-[90%] md:w-[94%] active:border-0 focus:border-0 outline-0 p-3 pr-6'

                    />
                    {showPassword ? <IoMdEye size={22} onClick={()=>{setShowPassword(!showPassword)}}/> : <IoMdEyeOff size={22} onClick={()=>{setShowPassword(!showPassword)}}/>}
                </div>
                <button type='button' onClick={handleSignIn} className='border-[2px] border-black bg-black text-primary-content p-3'>SIGN IN</button>
            </form>
            <div className='text-center mt-4'>
                <p className='text-end pr-2'>Forgot?</p>
                <p onClick={handleGoogleSignIn} className='text-[1.1rem] inline-flex items-center gap-1 mt-16 cursor-pointer border-[2px] p-3'>Sign In With Google <AiFillGoogleSquare size={40} /></p>
                <br />
                <p onClick={()=>{setProfile("sign-up")}} className='text-xl inline-flex items-center gap-1 mt-8 cursor-pointer'>Sign Up <AiOutlineRightCircle size={28} /></p>
            </div>
        </div>
    </div>
  )
}
