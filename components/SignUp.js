import React, { useRef, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { AiFillGoogleSquare, AiOutlineRightCircle } from 'react-icons/ai'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { AuthContext } from '../context/authContext'

export const SignUp = ({setProfile}) => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const regEx = {
        name: /^[a-zA-Z]{2,30}$/,
        email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        password: /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/, //(?=.*[!@#$%^&*])
    }

    const { showPassword, setShowPassword, signUp, currentUser, googleSignUp } = useContext(AuthContext)

    useEffect(()=>{
        currentUser?.displayName && setProfile('profile')
        setShowPassword(false)
    },[currentUser]) //eslint-disable-line
    const handleSignUp = async () => {
        if(!regEx.name.test(nameRef.current.value)){
            toast.error('Enter a valid name')
            return
        }
        if(!regEx.email.test(emailRef.current.value)){
            toast.error('Enter a valid email')
            return
        }
        if(!regEx.password.test(passwordRef.current.value)){
            toast.error('password doesn\'t meet required combination')
            return
        }

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            toast.error('Passwords don\'t match')
            return
        }

        try {
            await signUp(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
        } catch (error) {
            toast.error(error)
        }

    }

    const handleGoogleSignUp = async () => {
        try {
            await googleSignUp()
        } catch (error) {
            toast.error(error)
        }
    }

  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-[98%] md:w-[80%]'>
            <form id='signUp' className='flex flex-col gap-5 select-none'>
                <input 
                    ref={nameRef}
                    type="name" 
                    placeholder="Name" 
                    className="border-[2px] border-black p-3"
                />
                <input
                    ref={emailRef}
                    type="email" 
                    placeholder="Email"
                    className="border-[2px] border-black p-3"
                />
                <div className="border-[2px] border-black flex items-center pr-2">
                    <input 
                        ref={passwordRef}
                        type={`${showPassword ? 'text' : 'password'}`} 
                        placeholder="Password" 
                        className='w-[90%] md:w-[94%] active:border-0 focus:border-0 outline-0 p-3 pr-6'

                    />
                    {showPassword ? <IoMdEye size={22} onClick={()=>{setShowPassword(!showPassword)}}/> : <IoMdEyeOff size={22} onClick={()=>{setShowPassword(!showPassword)}}/>}
                </div>
                <input 
                    ref={confirmPasswordRef}
                    type={`${showPassword ? 'text' : 'password'}`} 
                    placeholder="Password Again" 
                    className="border-[2px] border-black p-3 mb-5"  
                />
                <button type='button' onClick={handleSignUp} className='border-[2px] border-black bg-black text-primary-content p-3'>SIGN UP</button>
            </form>
            <div className='text-center mt-4'>
                <p onClick={handleGoogleSignUp} className='text-[1.1rem] inline-flex items-center gap-1 mt-16 cursor-pointer border-[2px] p-3'>Sign Up With Google <AiFillGoogleSquare size={40} /></p>
                <br />
                <p onClick={()=>{setProfile("sign-in")}} className='text-xl inline-flex items-center gap-1 mt-8 cursor-pointer'>Sign In <AiOutlineRightCircle size={28} /></p>
            </div>
        </div>
    </div>
  )
}
