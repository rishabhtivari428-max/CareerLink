import { axiosInstance } from "../api/axiosInstance";

export async function postJob(title, description, location, requirements, company){
    const response = await axiosInstance.post(`/api/auth/postjob`,{
        title, 
        description, 
        location, 
        requirements, 
        company
    })
    return response.data
}

export async function getJob(){
    const response = await axiosInstance.get('/api/auth/getjob')
    return response.data
}

export async function deleteJob(id){
    const response = await axiosInstance.delete(`/api/auth/deletejob/${id}`)
    return response.data
}