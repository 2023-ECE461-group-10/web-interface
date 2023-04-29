import axios from 'axios';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { uploadFile, uploadUrl } from '../api/apiCalls';
import theme from '../theme';

const FileUpload = () => {

    const [file, setFile] = React.useState<File | null>(null);
    const [packageName, setPackageName] = React.useState<string>('');
    const [packageUrl, setPackageUrl] = React.useState<string>('');
    const [checked, setChecked] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handlePackageNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageName(event.target.value);
    };

    const handlePackageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageUrl(event.target.value);
    };

    const handleUpload = async () => {
        // if checked, upload file else, upload url

        if (checked && file) {
            console.log('uploading file');
            // string zip should be in content
            try {
                await uploadFile(file, packageName);
                console.log('file uploaded');
            } catch (error) {
                console.log(error, 'error uploading file');
            }
        } else {
            console.log('uploading url');
            //
            try {
                await uploadUrl(packageUrl, packageName);
                console.log('url uploaded');
                // clear form data
                setPackageName('');
                setPackageUrl('');
                setFile(null);
            } catch (error) {
                console.log(error, 'error uploading url');
            }
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: 1,
                marginTop: '2em',
                padding: '0.5em',
                borderRadius: '0.5em',
                borderColor: theme.palette.primary.main,
                bgcolor: '#fff',
            }} >
                <Typography variant="h6">
                    Upload a Package:
                </Typography>
                <TextField
                    sx={{ margin: '1em' }}
                    label="Package Name"
                    variant="outlined"
                    value={packageName}
                    onChange={handlePackageNameChange}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Typography variant="body1">
                        URL
                    </Typography>
                    <Switch color="default"
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography variant="body1">
                        Zip File
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '20em' }}>
                        <TextField
                            sx={{ margin: '1em' }}
                            fullWidth={true}
                            label="Package URL"
                            variant="outlined"
                            value={packageUrl}
                            onChange={handlePackageUrlChange}
                            disabled={checked}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '20em' }}>
                        <Box>
                            <Button
                                sx={{ width: '10em', marginRight: '1em' }}
                                variant="contained"
                                disabled={!checked}
                                component="label">
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    accept='.zip'
                                    onChange={handleFileChange} />
                            </Button>
                            <Typography variant="body1" width='15em' noWrap={true}>
                                File Selected: {file?.name}
                            </Typography>
                            <IconButton disabled={!checked || file === null} aria-label="delete" onClick={() => setFile(null)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Button disabled={(packageName == '') || (!checked && packageUrl == '') || (checked && file === null)} variant='contained' onClick={handleUpload}>Submit</Button>
            </Box >
        </Box>
    );

}

export default FileUpload;