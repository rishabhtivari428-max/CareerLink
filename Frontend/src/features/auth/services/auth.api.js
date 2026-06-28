import axiosInstance from '../api/axiosInstance'

export async function registerUser(username, email, password, role){
    const response = await axiosInstance.post('/api/auth/register', {
        username,
        email,
        password,
        role
    })
    return response.data 
}

export async function loginUser(email, password){
    const response = await axiosInstance.post('/api/auth/login', {
        email,
        password
    })
    return response.data
}

export async function getMe(){
    const response = await axiosInstance.get('/api/auth/getMe')
    return response.data
}

export async function logoutUser(){
    const response = await axiosInstance.post('/api/auth/logout')
    return response.data
}