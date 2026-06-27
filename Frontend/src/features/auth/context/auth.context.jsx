import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { registerUser as registerAPI, loginUser as loginAPI, getMe } from '../services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)

    const loginUser = async (email, password) => {
        setloading(true)
        try {
            const response = await loginAPI(email, password)
            setuser(response.user)
        } catch (error) {
            console.log("Error while logging the user: ", error)
        }
        finally {
            setloading(false)
        }
    }

    const registerUser = async (username, email, password, role) => {
        setloading(true)
        try {
            const response = await registerAPI(username, email, password, role)
            setuser(response.user)
        } catch (error) {
            console.log("Erro while registering the user: ", error)
        }
        finally {
            setloading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const response = await getMe();
            setuser(response.user)
        } catch (error) {
            if (error.response?.status !== 401) {
                console.log("Error while fetching user: ", error)
            }
        }
    }

    useEffect(() => {
        const initUser = async () => {
            setloading(true)
            await fetchUser();
            setloading(false)
        }
        initUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser }}>
            {children}
        </AuthContext.Provider>
    )
}