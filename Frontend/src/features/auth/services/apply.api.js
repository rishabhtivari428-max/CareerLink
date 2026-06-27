import axiosInstance from '../api/axiosInstance'

export async function apply(id){
    const response = await axiosInstance.post(`/api/apply/apply/${id}`)
    return response.data 
}

export async function getAllApp(id){
    const response = await axiosInstance.get(`/api/apply/getAllApp/${id}`)
    return response.data
}

export async function getAllJobsApp(id){
    const response = await axiosInstance.get(`/api/apply/getAllJobsApp/${id}`)
    return response.data
}

export async function update(id, status){
    const response = await axiosInstance.patch(`/api/apply/update/${id}`, {
        status
    })
    return response.data
}