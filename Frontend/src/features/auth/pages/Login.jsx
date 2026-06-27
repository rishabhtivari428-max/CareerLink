import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { loginUser, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await loginUser(email, password)
            console.log("User logged in successfully")
            navigate('/jobs')
        } catch (error) {
            console.log("Error while logging you in...", error)
        }
    }

    if(loading){
        return(
            <h1>Loading...</h1>
        )
    }

  return (
    <form onSubmit={handleSubmit}>
        <h1>Login User</h1>
        <input type="text" 
        value={email}
        onChange={(e) => setemail(e.target.value)}
        placeholder='Enter your E-Mail'
        />
        <input type="password" 
        value={password}
        onChange={(e) =>  setpassword(e.target.value)}
        placeholder='Enter your Password'
        />
        <button type='submit'>Login</button>
    </form>
  )
}

export default Login