import { createContext, useState } from "react";
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

const Context = createContext()

export const StateContext = ({children}) => {

    //for navbar menu button
    const [hamburgerToggle, setHamburgerToggle] = useState(false)
    //toggle cart modal
    const [showCart, setShowCart] = useState(false)
    //for user modal from navbar
    const [showUser, setShowUser] = useState(false)

    const bodyScrollLock = (bool) => {
        bool ? disableBodyScroll(document.querySelector('body')) : enableBodyScroll(document.querySelector('body'))
    }

    return  <Context.Provider value={
        {
            hamburgerToggle,
            showCart,
            showUser,
            setHamburgerToggle,
            setShowCart,
            setShowUser,
            bodyScrollLock,
        }
    }>
        {children}
    </Context.Provider>
}

export default Context