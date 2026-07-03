import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { registerUser as registerAPI, loginUser as loginAPI, getMe, logoutUser as logoutAPI } from '../services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    const loginUser = async (email, password) => {
        setloading(true)
        try {
            const response = await loginAPI(email, password)
            await fetchUser()

        } catch (error) {
            console.log("Error while logging the user: ", error)
            throw error
        } finally {
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

    const logoutUser = async () => {
        setloading(true)
        try {
            await logoutAPI()
            setuser(null)
        } catch (error) {
            console.log("Error while logging out: ", error)
        } finally {
            setloading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}