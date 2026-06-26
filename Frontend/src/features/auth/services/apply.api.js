import axiosInstance from '../api/axiosInstance'

export async function apply(id, status){
    const response = await axiosInstance.post(`/api/auth/apply/${id}`, {
        status
    })
    return response.data 
}

export async function getAllApp(id){
    const response = await axiosInstance.get(`/api/auth/getAllApp/${id}`)
    return response.data
}

export async function getAllJobsApp(id){
    const response = await axiosInstance.get(`/api/auth/getAllJobsApp/${id}`)
    return response.data
}

export async function update(id, status){
    const response = await axiosInstance.patch(`/api/auth/update/${id}`, {
        status
    })
    return response.data
}