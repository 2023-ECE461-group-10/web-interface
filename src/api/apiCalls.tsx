import axios from 'axios';

//post request for file upload
export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

//put request for file updating
export const updateFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.put('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

//delete request for file deletion
export const deleteFile = (fileId: string) => {
    return axios.delete(`/api/v1/files/${fileId}`);
}

//get request for file download
export const downloadFile = (fileId: string) => {
    return axios.get(`/api/v1/files/${fileId}`, {
        responseType: 'blob',
    });
}

//post request for package rating
export const ratePackage = (packageId: string, rating: number) => {
    return axios.post(`/api/v1/packages/${packageId}/rating`, {
        rating,
    });
}

//get request for all packages
export const getPackages = () => {
    return axios.get('/api/v1/packages');
}

//delete request to reset the database
export const resetDatabase = () => {
    return axios.delete('/api/v1/reset');
}
