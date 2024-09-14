

import { createContext, useState } from  "react";


const  myContext = createContext({})

export const ContextProvider = ({children})=>{
  const [user,setUser] = useState(null)
  const [showNavbar,setShowNavbar] = useState(false)

  return (
    <myContext.Provider value={{user,setUser,showNavbar,setShowNavbar}}>
     {children}
    </myContext.Provider>
  )
}

export default myContext