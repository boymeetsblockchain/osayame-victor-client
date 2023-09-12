import { createContext,useState,useEffect } from "react";
import axios from 'axios'
const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    // const url= "http://localhost:5000/api/user/profile"
    const [user,setUser]= useState()
    return(
     <AuthContext.Provider value={{user,setUser}}>
        {children}
     </AuthContext.Provider>
    )
}

export default AuthContext