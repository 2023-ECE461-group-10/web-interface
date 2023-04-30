import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField, InputAdornment, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getPackages, getPackageRating, downloadPackage, deletePackage, updatePackage } from '../api/apiCalls';
import theme from '../theme';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'material-ui-snackbar-provider'

export default function PackageList() {
    const [rows, setRows] = React.useState<any[]>([]);
    const [filteredRows, setFilteredRows] = React.useState<any[]>(rows);
    const [selectedRow, setSelectedRow] = React.useState<{
        name: string,
        id: number,
        version: string,
        url?: string,
        net_score?: number,
        ramp_up_score?: number,
        correctness_score?: number,
        bus_factor_score?: number,
        responsive_maintainer_score?: number,
        pinning_fraction?: number,
        pr_fraction?: number,
        license_score?: number,
    } | null>(null);
    const [zipFile, setZipFile] = React.useState<File | null>(null);

    const [loading, setLoading] = React.useState<boolean>(false);
    const snackbar = useSnackbar();

    const filterRows = (rows: any, filter: string) => {
        const filteredRows = rows.filter((row: any) => row.name.toLowerCase().includes(filter.toLowerCase()));
        setFilteredRows(filteredRows);
    }

    // fill rows with data from database (getPackages call)
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await getPackages();
            // console.log('response', response);
            const data = response.data.map((row: any) => {
                return { name: row.Name, version: row.Version, id: row.ID };
            });
            // console.log('data', data);
            setRows(data);
        }
        fetchData();
    }, []);

    // any time rows changes, filter rows
    React.useEffect(() => {
        filterRows(rows, '');
    }, [rows]);

    const handleRowSelect = async (row: any) => {
        // get package details from database
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getPackageRating(row.id);
                const data = {
                    url: response.data.URL,
                    net_score: response.data.NetScore,
                    ramp_up_score: response.data.RampUp,
                    correctness_score: response.data.Correctness,
                    bus_factor_score: response.data.BusFactor,
                    responsive_maintainer_score: response.data.ResponsiveMaintainer,
                    pinning_fraction: response.data.GoodPinningPractice,
                    pr_fraction: response.data.PullRequest,
                    license_score: response.data.LicenseScore,
                };
                setSelectedRow({ ...row, ...data });
                // console.log('selectedRow', { ...row, ...data });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        await fetchData();
    }

    const handleDownload = () => {
        const fetchData = async () => {
            if (!selectedRow?.id) return;
            try {
                setLoading(true);
                const response = await downloadPackage(selectedRow?.id);
                // console.log('response', response);
                const plaintext = response.data.data.Content;

                const byteCharacters = atob(plaintext);

                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);

                const blob = new Blob([byteArray], { type: 'application/zip' });

                const url = window.URL.createObjectURL(blob);
                const element = document.createElement('a');
                element.href = url;
                element.setAttribute('download', `${selectedRow?.name}-${selectedRow?.version}.zip`);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }
            catch (error: any) {
                console.log(error);
                if (error.message === 'Network Error') {
                    snackbar.showMessage('Download Error, likely file is too large for GCP to handle (32mb limit)');
                } else {
                    snackbar.showMessage('Download Error');
                }
                setLoading(false);
            }
        }
        fetchData();
    }

    const handleDelete = () => {
        const fetchData = async () => {
            if (!selectedRow?.id) return;
            try {
                setLoading(true);
                await deletePackage(selectedRow?.id);
                snackbar.showMessage('Package deleted');
                // refresh page
                window.location.reload();
            } catch (error) {
                snackbar.showMessage('Delete Error');
                console.log(error);
            }
            setLoading(false);
        }
        fetchData();
    }

    const handleUpdate = async () => {
        if (selectedRow?.name && selectedRow?.version && selectedRow?.id && selectedRow?.url) {
            setLoading(true);
            try {
                await updatePackage(selectedRow?.name, selectedRow?.version, selectedRow?.id, selectedRow?.url);
                snackbar.showMessage('Package updated');
                // refresh page
                window.location.reload();
            } catch (error) {
                snackbar.showMessage('Update Error');
                console.log(error);
            }
            setLoading(false);
        }
        else {
            console.log('required fields missing');
            snackbar.showMessage('Required fields are missing');
        }
    }

    return (
        <Box sx={{ padding: '1em', margin: '1em' }}>
            <Backdrop sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <TextField variant='outlined'
                    sx={{ paddingBottom: '1em', width: '25em', minWidth: '10em' }}
                    label="Search Packages"
                    onChange={(e) => filterRows(rows, e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <TableContainer component={Paper} sx={{ width: '20.2em', maxHeight: 600, overflow: 'auto', border: 1, borderRadius: '0.5em', borderColor: theme.palette.primary.main }}>
                    <Table sx={{ width: '20em' }} stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell>Package</TableCell>
                                <TableCell>Version</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <TableRow
                                    selected={selectedRow?.name === row.name}
                                    onClick={() => handleRowSelect(row)}
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.version}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1,
                    marginLeft: '1em',
                    border: 1,
                    padding: '0.5em',
                    borderRadius: '0.5em',
                    borderColor: theme.palette.primary.main,
                }} >
                    <Typography variant="h4">
                        Package Details
                    </Typography>
                    {
                        selectedRow === null ?
                            <Typography variant="h6">
                                Select a package to view details
                            </Typography> :
                            <>
                                <Typography variant="h6">
                                    {rows.find((row) => row.id === selectedRow.id)?.name} {rows.find((row) => row.id === selectedRow.id)?.version}
                                </Typography>
                                <Button variant='contained' sx={{ margin: '0.5em', width: '15em' }} onClick={handleDownload}>
                                    Download
                                </Button>
                                <Button variant='contained' color='error' sx={{ margin: '0.5em', width: '15em' }} onClick={handleDelete}>
                                    Delete
                                </Button>
                                <TextField
                                    margin="normal"
                                    sx={{ width: '20em' }}
                                    required={true}
                                    error={selectedRow?.name === ''}
                                    label="Name"
                                    value={selectedRow?.name}
                                    onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
                                />
                                <TextField
                                    margin="normal"
                                    sx={{ width: '20em' }}
                                    required={true}
                                    error={selectedRow?.version === ''}
                                    label="Version"
                                    value={selectedRow?.version}
                                    onChange={(e) => setSelectedRow({ ...selectedRow, version: e.target.value })}
                                />
                                <TextField
                                    margin="normal"
                                    sx={{ width: '20em' }}
                                    required={true}
                                    error={selectedRow?.url === ''}
                                    label="URL"
                                    value={selectedRow?.url}
                                    onChange={(e) => setSelectedRow({ ...selectedRow, url: e.target.value })}
                                />
                                <Button variant='contained' sx={{ margin: '0.5em', width: '15em' }} onClick={handleUpdate}>
                                    Update
                                </Button>
                                <Typography variant='h6'>
                                    Scores
                                </Typography>
                                <Typography variant='body1'>
                                    Net Score: {selectedRow?.net_score?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    Ramp Up Score: {selectedRow?.ramp_up_score?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    Correctness Score: {selectedRow?.correctness_score?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    Bus Factor Score: {selectedRow?.bus_factor_score?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    Responsive Maintainer Score: {selectedRow?.responsive_maintainer_score?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    Pinning Fraction: {selectedRow?.pinning_fraction?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    PR Fraction: {selectedRow?.pr_fraction?.toFixed(1)}
                                </Typography>
                                <Typography variant='body1'>
                                    License Score: {selectedRow?.license_score?.toFixed(1)}
                                </Typography>
                            </>
                    }
                </Box>
            </Box>
            {/* <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto', border: 1, borderRadius: '0.5em', borderColor: theme.palette.primary.main }}>
                <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell>Package</TableCell>
                            <TableCell align="right">Net Score</TableCell>
                            <TableCell align="right">Ramp Up</TableCell>
                            <TableCell align="right">Correctness</TableCell>
                            <TableCell align="right">Bus Factor</TableCell>
                            <TableCell align="right">Responsiveness</TableCell>
                            <TableCell align="right">Pinning Fraction</TableCell>
                            <TableCell align="right">PR Fraction</TableCell>
                            <TableCell align="right">License Score</TableCell>
                            <TableCell align="right">Download</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.net_score}</TableCell>
                                <TableCell align="right">{row.ramp_up_score}</TableCell>
                                <TableCell align="right">{row.correctness_score}</TableCell>
                                <TableCell align="right">{row.bus_factor_score}</TableCell>
                                <TableCell align="right">{row.responsive_maintainer_score}</TableCell>
                                <TableCell align="right">{row.pinning_fraction}</TableCell>
                                <TableCell align="right">{row.pr_fraction}</TableCell>
                                <TableCell align="right">{row.license_score}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" href={row.download_url} download>Download</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Box>
    );
}
