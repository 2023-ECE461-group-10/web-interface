import axios from 'axios';

//post request for file upload
export const uploadFile = async (file: File, packageName: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('packageName', packageName);
    return await axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

//post request for url upload
export const uploadUrl = async (url: string, packageName: string) => {
    return await axios.post('/api/v1/files', {
        url,
        packageName,
    });
};

//put request for file updating
export const updateFile = async (file: File, packageName: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('packageName', packageName);
    return await axios.put('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

//put request for url updating
export const updateUrl = async (url: string, packageName: string) => {
    return await axios.put('/api/v1/files', {
        url,
        packageName,
    });
};

//delete request for package deletion
export const deletePackage = async (fileId: string) => {
    return await axios.delete(`/api/v1/files/${fileId}`);
}

//get request for package download
export const downloadPackage = async (fileId: string) => {
    return await axios.get(`/api/v1/files/${fileId}`, {
        responseType: 'blob',
    });
}

//post request for package rating
export const ratePackage = async (packageId: string, rating: number) => {
    return await axios.post(`/api/v1/packages/${packageId}/rating`, {
        rating,
    });
}

//get request for all packages
export const getPackages = async () => {
    return await axios.get('/api/v1/packages');
}

//delete request to reset the database
export const resetDatabase = async () => {
    return await axios.delete('/api/v1/reset');
}
