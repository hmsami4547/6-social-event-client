import { useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../Firebase/firebase.init"

export const AuthProvider =({children}) =>{
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(users)=>{
        setUser(users)
        setLoading(false)
        if(users?.email){
            try{
await fetch('http://localhost:3000/jwt',{
    method: "POST",
    headers:{"Content-Type" : "application/json"},
    credentials: "include",
    body: JSON.stringify({email: users.email})
})
            }catch(error){console.log(error)}
        }
    })
    return ()=>unsubscribe ()
},[])

const createUser = (email, password) => {
setLoading(true)
return createUserWithEmailAndPassword(auth, email, password)
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
    try{
await fetch('http://localhost:3000/logout',{
    method: "POST",
    credentials: "include"
})
    }catch(error){console.log(error)}
    return signOut(auth)
}
const value ={
    user, logOut, createUser, signInUser, LogOut, setUser,signInWithGoogle,loading,setLoading
}
return(
<AuthContext.Provider value={value}>{children}</AuthContext.Provider>

)

}