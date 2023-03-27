import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const FileUpload = () => {

    const [file, setFile] = React.useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handleUpload = () => {
        console.log(file);
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                console.log(response);
            });
        }
    }

    return (
        <Box sx={{ width: '20em', border: 1, margin: '1em', padding: '1em', borderRadius: '0.5em', borderColor: '#cd5141' }}>
            <Button
                variant="contained"
                component="label">
                Upload File
                <input
                    type="file"
                    hidden
                    accept='.zip'
                    onChange={handleFileChange}/>
            </Button>
            <Typography variant="body1">
                File Selected: {file?.name}
            </Typography>
            <IconButton disabled={file === null} aria-label="delete" onClick={() => setFile(null)}>
                <CloseIcon />
            </IconButton>
            <Button disabled={file === null} variant='contained' onClick={handleUpload}>Submit</Button>
        </Box>
    );

}

export default FileUpload;