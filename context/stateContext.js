import { createContext, useState } from "react";

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


    const addItemsToCart = (product, qty) => {
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

            setCartItems([...cartItems, {...product, quantity:qty}])
        }
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
        }
    }>
        {children}
    </Context.Provider>
}

export default Context