import { createContext, useState } from "react";

const Context = createContext()

export const StateContext = ({children}) => {

    //for navbar menu button
    const [hamburgerToggle, setHamburgerToggle] = useState(false)
    //toggle cart modal
    const [showCart, setShowCart] = useState(false)
    //for user modal from navbar
    const [showUser, setShowUser] = useState(false)

    return  <Context.Provider value={
        {
            hamburgerToggle,
            showCart,
            showUser,
            setHamburgerToggle,
            setShowCart,
            setShowUser,
        }
    }>
        {children}
    </Context.Provider>
}

export default Context