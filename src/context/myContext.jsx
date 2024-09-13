

import { createContext, useState } from  "react";


const  myContext = createContext({

})

export const ContextProvider = ({children})=>{
  const [user,setUser] = useState(null)

  return (
    <myContext.Provider value={{user,setUser}}>
     {children}
    </myContext.Provider>
  )
}

export default myContext