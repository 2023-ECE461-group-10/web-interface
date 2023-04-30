import axios from 'axios';

axios.defaults.baseURL = 'https://rest-api-ecoc6k2tbq-uc.a.run.app';

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
export const uploadFile = async (file: File) => {

    // convert file to base64 string
    const base64String = file && await file.arrayBuffer().then((buffer) => {
        const bytes = new Uint8Array(buffer);
        return btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ''));
    });

    const body = JSON.stringify({ Content: base64String });
    const config = {
        headers: {
            'X-Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    };
    return await axios.post('/package', body, config);
};

//post request for url upload
export const uploadUrl = async (url: string) => {
    const body = JSON.stringify({ URL: url });
    const config = {
        headers: {
            'X-Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    };
    return await axios.post('/package', body, config);
};


//put request for package update
export const updatePackage = async (packageName: string, version: string, id: number, url: string,) => {
    const body = JSON.stringify({
        metadata: {
            Name: packageName,
            Version: version,
            ID: id.toString(),
        },
        data: {
            URL: url,
        },
    });
    const config = {
        headers: {
            'X-Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json',
        }
    };
    return await axios.put(`/package/${id}`, body, config);
};


//get request for package download
export const downloadPackage = async (id: number) => {
    const config = {
        headers: { 'X-Authorization': localStorage.getItem('token') },
    };
    return await axios.get(`/package/${id}`, config);
}
//delete request for package deletion
export const deletePackage = async (id: number) => {
    const config = {
        headers: { 'X-Authorization': localStorage.getItem('token') },
    };
    return await axios.delete(`/package/${id}`, config);
}

//get request for package rating
export const getPackageRating = async (packageId: string) => {
    const config = {
        headers: { 'X-Authorization': localStorage.getItem('token') }
    };
    return await axios.get(`/package/${packageId}/rate`, config);
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
