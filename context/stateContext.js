import { createContext, useState } from "react";
import toast from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({children}) => {

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
        }
    }>
        {children}
    </Context.Provider>
}

export default Context