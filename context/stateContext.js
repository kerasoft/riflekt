import { createContext, useState } from "react";

const Context = createContext()

export const StateContext = ({children}) => {
    const [hamburgerToggle, setHamburgerToggle] = useState(false)
    const [showCart, setShowCart] = useState(false)

    return  <Context.Provider value={
        {
            hamburgerToggle,
            showCart,
            setHamburgerToggle,
            setShowCart
        }
    }>
        {children}
    </Context.Provider>
}

export default Context