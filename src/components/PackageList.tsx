import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileUpload from './FileUpload';
import { resetDatabase } from '../api/apiCalls';
import ConfirmationDialog from './ConfirmationDialog';

// URL NET_SCORE RAMP_UP_SCORE CORRECTNESS_SCORE BUS_FACTOR_SCORE RESPONSIVE_MAINTAINER_SCORE PINNING_FRACTION PR_FRACTION LICENSE_SCORE

function createData(
    name: string,
    net_score: number,
    ramp_up_score: number,
    correctness_score: number,
    bus_factor_score: number,
    responsive_maintainer_score: number,
    pinning_fraction: number,
    pr_fraction: number,
    license_score: number,
    download_url: string,
) {
    return { name, net_score, ramp_up_score, correctness_score, bus_factor_score, responsive_maintainer_score, pinning_fraction, pr_fraction, license_score, download_url };
}

const downloadUrl = '/acme-logo.png';

const rows = [
    createData('nodist', 0.9, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('npm', 0.8, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('yarn', 0.7, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('browserify', 0.6, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('webpack', 0.5, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash1', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash2', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash3', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash4', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash5', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash6', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash7', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash8', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash9', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash10', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash11', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash12', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash13', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash14', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
    createData('lodash15', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1, downloadUrl),
];

export default function PackageList() {
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [open, setOpen] = React.useState(false);

    const filterRows = (rows: any, filter: string) => {
        const filteredRows = rows.filter((row: any) => row.name.toLowerCase().includes(filter.toLowerCase()));
        setFilteredRows(filteredRows);
    }

    const handleSystemReset = async () => { // calls reset function in App.tsx
        // trigger confirmation dialog
        console.log('resetting database');
        try {
            await resetDatabase();
            // open success snackbar
        } catch (error) {
            console.log(error, 'error resetting database');
            // open error snackbar
        }
    };

    return (
        <Box sx={{ padding: '1em', margin: '1em' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TextField variant='outlined'
                    sx={{ paddingBottom: '1em', width: '25em', minWidth: '10em' }}
                    onChange={(e) => filterRows(rows, e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />
                <FileUpload />
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto', border: 1, borderRadius: '0.5em', borderColor: '#cd5141' }}>
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
            </TableContainer>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button
                    sx={{ marginTop: '1em', alignSelf: 'center' }}
                    variant='outlined'
                    color='error'
                    onClick={() => setOpen(true)}>
                    Reset to default System State
                </Button>
            </Box>
            <ConfirmationDialog open={open} setOpen={setOpen} confirmAction={handleSystemReset} />
        </Box>

    );
}