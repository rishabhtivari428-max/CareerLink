import axiosInstance  from "../api/axiosInstance";

export async function postJob(title, description, location, requirements, company, Salary, role){
    const response = await axiosInstance.post(`/api/jobs/postjob`,{
        title, 
        description, 
        location, 
        requirements, 
        company,
        Salary,
        role
    })
    return response.data
}

export async function getJob(){
    const response = await axiosInstance.get('/api/jobs/getjob')
    return response.data
}

export async function deleteJob(id){
    const response = await axiosInstance.delete(`/api/jobs/deletejob/${id}`)
    return response.data
}