import axiosInstance from '../api/axiosInstance'

export async function apply(id) {
    const response = await axiosInstance.post(`/api/apply/apply/${id}`)
    return response.data
}

export const getAllApp = async (id) => {
    const response = await axiosInstance.get(`/api/apply/getAllApp/${id}`);
    return response.data
};

export async function getAllJobsApp(id) {
    const response = await axiosInstance.get(`/api/apply/getAllJobsApp/${id}`)
    return response.data
}

export async function update(id, status) {
    const response = await axiosInstance.patch(`/api/apply/update/${id}`, {
        status
    })
    return response.data
}

export const uploadResume = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('resume', file);

    const res = await axiosInstance.post('/api/resume/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return res.data;
};