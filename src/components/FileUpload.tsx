import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const FileUpload = () => {

    const [file, setFile] = React.useState<File | null>(null);
    const [packageName, setPackageName] = React.useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handlePackageNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageName(event.target.value);
    };

    const handleUpload = () => {
        console.log(file);
        if (file && packageName !== '') {
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 1,
            marginLeft: '1em',
            marginBottom: '1em',
            padding: '0.5em',
            borderRadius: '0.5em',
            borderColor: '#cd5141'
        }}>
            <Typography variant="h6">
                Upload a Package:
            </Typography>
            <TextField
                label="Package Name"
                variant="outlined"
                value={packageName}
                onChange={handlePackageNameChange}
            />
            <Button
                sx={{ width: '10em', marginRight: '1em' }}
                variant="contained"
                component="label">
                Upload
                <input
                    type="file"
                    hidden
                    accept='.zip'
                    onChange={handleFileChange} />
            </Button>
            <Typography variant="body1" width='20em' noWrap={true}>
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