import { useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../Firebase/firebase.init"

export const AuthProvider =({children}) =>{
const [user, setUser] = useState("Sami")
const [loading, setLoading] = useState(true)
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(users)=>{
        setUser(users)
        setLoading(false)
    })
    return ()=>unsubscribe ()
},[])

const createUser = (email, password) => {
setLoading(true)
return createUserWithEmailAndPassword(auth, email, password)
}
const logOut = () =>{
    setUser(null)
}
const signInWithGoogle = (auth, provider) =>{
    setLoading(true)
    return signInWithPopup(auth, provider)
}


const signInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const LogOut = () =>{
    setLoading(true)
    return signOut(auth)
}
const value ={
    user, logOut, createUser, signInUser, LogOut, setUser,signInWithGoogle
}
return(
<AuthContext.Provider value={value}>{children}</AuthContext.Provider>

)

}