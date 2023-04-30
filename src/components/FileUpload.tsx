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
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'material-ui-snackbar-provider'

const FileUpload = () => {

    const [file, setFile] = React.useState<File | null>(null);
    const [packageUrl, setPackageUrl] = React.useState<string>('');
    const [checked, setChecked] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const snackbar = useSnackbar();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    }

    const handlePackageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPackageUrl(event.target.value);
    };

    const handleUpload = async () => {
        // if checked, upload file else, upload url

        if (checked && file) {
            console.log('uploading file');
            // string zip should be in content
            try {
                setLoading(true);
                await uploadFile(file);
                console.log('file uploaded');
                // clear form data
                setPackageUrl('');
                setFile(null);
                // open success snack bar
                snackbar.showMessage('File uploaded successfully');
            } catch (error: any) {
                // if 424 error, open snackbar with error message
                if (error.response.status === 424) {
                    snackbar.showMessage('Package failed metric score check');
                } else {
                    snackbar.showMessage('Server error uploading file');
                }
            }
            setLoading(false);
        } else {
            console.log('uploading url');
            //
            try {
                setLoading(true);
                await uploadUrl(packageUrl);
                console.log('url uploaded');
                // clear form data
                setPackageUrl('');
                setFile(null);
                // open success snack bar
                snackbar.showMessage('URL uploaded successfully');
            } catch (error: any) {
                console.log(error);
                if (error.response?.status === 424) {
                    snackbar.showMessage('Package failed metric score check');
                } else if (error.response?.status === 409) {
                    snackbar.showMessage('Package already exists');
                } else if (error.message === 'Network Error') {
                    snackbar.showMessage('Warning: Package may have been ingested, check package list');
                } else {
                    snackbar.showMessage('Server error ingesting URL, ensure URL is valid');
                }
            }
            setLoading(false);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}>
            <Backdrop sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
            }} >
                <Typography variant="h6">
                    Upload a Package:
                </Typography>
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
                <Button disabled={(!checked && packageUrl == '') || (checked && file === null)} variant='contained' onClick={handleUpload}>Submit</Button>
            </Box >
        </Box>
    );

}

export default FileUpload;