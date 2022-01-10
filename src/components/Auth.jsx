import React, { useState } from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../firebase-config'

 function Auth(){
    const [regEmail, setRegEmail] = useState("")
    const [regPass, setRegPass] = useState("")
    const [logInEmail, setLogInEmail] = useState("")
    const [logInPass, setLogInPass] = useState("")

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState({isLoading: false, target: null})

    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser)
    })
    
     const register = async (target) =>{
         try{
            setLoading({isLoading:true,target})
            const user = await createUserWithEmailAndPassword(auth, regEmail, regPass)
            console.log(user)
         }catch(error){
            console.log(error.message)
         }finally{
             setLoading({isLoading:false,target:null})
         }
     }

     const login = async (target) =>{
        try{
            setLoading({isLoading:true,target})
            const user = await signInWithEmailAndPassword(auth, logInEmail, logInPass)
            console.log(user)
         }catch(error){
            console.log(error.message)
         }finally{
            setLoading({isLoading:false,target:null})
         }
     }

     const logout = async () =>{
        await signOut(auth)
     }

    return(
        <div className="auth">
            <div>
                <h3>Register User</h3>
                <input type="text" onChange={(event)=>{setRegEmail(event.target.value)}}  placeholder='Email..' />
                <input type="password" onChange={(event)=>{setRegPass(event.target.value)}} placeholder='Password..' />

                <button onClick={(e)=>register(e.target.name)} name='register'> {(loading.isLoading && loading.target==='register') ? 'loading..' : 'Create User' }</button>
            </div>
            <div>
                <h3>Login</h3>
                <input type="text" onChange={(event)=>{setLogInEmail(event.target.value)}} placeholder='Email..' />
                <input type="password" onChange={(event)=>{setLogInPass(event.target.value)}} placeholder='Password..' />

                <button onClick={(e)=>login(e.target.name)} name='login'> {(loading.isLoading && loading.target==='login') ? 'loading..' : 'Login' }</button>
            </div>

            {user?.email &&
                <>
                    <h4>User Logged In</h4>
                    {user.email} <button onClick={logout}> Sign Out</button>
                </>
            }
        </div>
    )
}

export default Auth