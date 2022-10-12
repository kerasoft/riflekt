import { createContext, useEffect, useState } from "react";
import { app } from '../firebase.config'
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider
    const [showPassword, setShowPassword] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    //render signUp/signIn/profile components
    const [profile, setProfile] = useState(currentUser ? 'profile' : 'sign-in')

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                setCurrentUser(user)
            }
        })
    }) //eslint-disable-line

    const signUp = (email, password, name) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(data => {
            let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
            setCurrentUser(data.user)
            updateProfile(auth.currentUser, {
                displayName: capitalizedName
            }).then(()=>{setProfile('profile')})
        })
    }

    const userSignOut = () => {
        signOut(auth).then(()=>{
            setCurrentUser('')
            setProfile('sign-in')
        }).catch((err)=>{
            toast.error(err)
        })
    }

    const googleSignUp = () => {
        signInWithPopup(auth, provider)
        .then(data=>{
            // const credential = GoogleAuthProvider.credentialFromResult(result)
            // const token = credential.accessToken
            setCurrentUser(data.user)
        }).catch(err=>{
            toast.error((err.toString().includes('closed-by-user')) && 'Cancelled by user')
        })
    }

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((data)=>{
            setCurrentUser(data.user)
        }).catch(err=>{
            toast.error((err.toString()).includes('not-found') ? 'User not found, sign up. Or check credentials and try again' : 'Wrong credentials entered, try again')
        })
    }
    return <AuthContext.Provider value={
        {
            showPassword,
            setShowPassword,
            signUp,
            currentUser,
            setCurrentUser,
            profile,
            setProfile,
            userSignOut,
            googleSignUp,
            signIn,
        }
    }>
        {children}
    </AuthContext.Provider>
}