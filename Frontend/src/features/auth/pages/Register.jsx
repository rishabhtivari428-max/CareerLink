import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [role, setrole] = useState("")
    const { registerUser, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await registerUser(username, email, password, role)
            navigate('/login')
            console.log("User registered successfully")
        } catch (error) {
            console.log("Error while registering user: ", error)
        }
        setusername("")
        setemail("")
        setpassword("")
        setrole("")
    }


    if (loading) {
        return 
        <h1 className='text-center font-bold text-5xl'>Loading...</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register User</h1>
            <input type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder='Enter your Username'
            />
            <input type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder='Enter your E-Mail'
            />
            <input type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder='Enter your Password'
            />
            <input type="text"
                value={role}
                onChange={(e) => setrole(e.target.value)}
                placeholder='Enter your Role'
            />
            <button type='submit'>Register</button>
        </form>
    )
}

export default Register