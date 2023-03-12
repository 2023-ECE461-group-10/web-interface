import * as React from 'react';
import Button from '@mui/material/Button';

const FileDownload = () => {

    const downloadUrl = '/acme-logo.png';

    return (
        <Button variant='contained' href={downloadUrl} download> Download ACME Logo</Button >  
    );
}

export default FileDownload;