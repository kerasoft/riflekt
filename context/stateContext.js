import { createContext, useState, useEffect } from "react";
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
import { app } from '../firebase.config'
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {

    const [zero, setZero] = useState(true)
    //for navbar menu button
    const [hamburgerToggle, setHamburgerToggle] = useState(false)
    //toggle cart modal
    const [showCart, setShowCart] = useState(false)
    //for user modal from navbar
    const [showUser, setShowUser] = useState(false)


    //orders, cart and stripe
    const [qty, setQty] = useState(1)
    
    const [cartItems, setCartItems] = useState([])
    
    const [totalQty, setTotalQty] = useState(0)
    
    const [totalPrice, setTotalPrice] = useState(0)
    
    
    //wish list
    const [wishList, setWishList] = useState([])
    
    const [showWishList, setShowWishList] = useState(false)
    
    
    
    // !firebase context

    // firebase 
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider
    const [showPassword, setShowPassword] = useState(false)
    const [currentUser, setCurrentUser] = useState()

    useEffect(()=>{
        let user_local = JSON.parse(localStorage.getItem('user'))
        setCurrentUser(user_local?.displayName!=='Guest' && user_local)
        setZero(false)
    },[])
    useEffect(()=>{
        let data_local = JSON.parse(localStorage.getItem((currentUser ? currentUser.email : 'guestmail')))
        data_local && setCartItems(data_local.cartItems)
        data_local && setTotalPrice(data_local.totalPrice)
        data_local && setTotalQty(data_local.totalQty)
    },[currentUser])

    //render signUp/signIn/profile components
    const [profile, setProfile] = useState(currentUser ? 'profile' : 'sign-in')


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

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                setCurrentUser(user)
                localStorage.setItem('user', JSON.stringify(user))
            }else{
                localStorage.setItem('user', JSON.stringify({displayName: 'Guest'}))
            }
        })
    }) //eslint-disable-line
    
    const addItemsToCart = (product, qty, nextImage) => {
        let productExists = cartItems.find(item=>item._id === product._id)
        if(productExists){
            let updatedCart = cartItems.map(item=>{
                if(item._id === product._id){
                    return {
                        ...item,
                        quantity: item.quantity + qty
                    }
                }else{
                    return item
                }
            })
            setCartItems(updatedCart)
            
        }else{
            
            setCartItems([...cartItems, {
                ...product, 
                quantity:qty, 
                nextImage: nextImage
            }])
        }
        
        setQty(1)
        setTotalPrice(totalPrice + (qty * product.price))
        setTotalQty(totalQty + qty)
        toast.success(`${qty} ${product.name} added to cart`)
    }

    useEffect(()=>{
        if(!zero) {

            localStorage.setItem((currentUser ? currentUser.email : 'guestmail'), JSON.stringify({
                cartItems,
                totalPrice,
                totalQty
            }))
        }
    },[cartItems, totalPrice, totalQty, zero, currentUser])

    

    return  <Context.Provider value={
        {
            hamburgerToggle,
            showCart,
            showUser,
            setHamburgerToggle,
            setShowCart,
            setShowUser,
            qty,
            setQty,
            cartItems,
            setCartItems,
            addItemsToCart,
            totalQty,
            setTotalQty,
            totalPrice,
            setTotalPrice,
            wishList,
            setWishList,
            showWishList,
            setShowWishList,

            // firebase
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
    </Context.Provider>
}

export default Context