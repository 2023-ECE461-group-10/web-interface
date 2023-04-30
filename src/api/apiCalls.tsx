import axios from 'axios';

axios.defaults.baseURL = 'https://rest-api-ecoc6k2tbq-uc.a.run.app';
// below is to deal with cors

// put request for authentication
export const authenticate = async (username: string, password: string) => {
    return await axios.put('/authenticate', {
        User: {
            name: username,
            isAdmin: true,
        },
        Secret: {
            password,
        }
    });
};


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

//get request for all packages, with X-Authorization header
export const getPackages = async () => {
    const body = JSON.stringify([{ Name: "*" }]);
    const headers = {
        'X-Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json',
    };
    return await axios.post('/packages', body, { headers });
}

//delete request to reset the database
export const resetDatabase = async () => {
    return await axios.delete('/api/v1/reset');
}
