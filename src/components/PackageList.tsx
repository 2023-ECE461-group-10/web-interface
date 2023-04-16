import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
) {
    return { name, net_score, ramp_up_score, correctness_score, bus_factor_score, responsive_maintainer_score, pinning_fraction, pr_fraction, license_score };
}

const rows = [
    createData('nodist', 0.9, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
    createData('npm', 0.8, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
    createData('yarn', 0.7, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
    createData('browserify', 0.6, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
    createData('webpack', 0.5, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
    createData('lodash', 0.4, 0.5, 0.7, 0.3, 0.4, 0.5, 0.6, 1),
];

export default function PackageList() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Package</TableCell>
                        <TableCell align="right">NET_SCORE</TableCell>
                        <TableCell align="right">RAMP_UP_SCORE&nbsp;(g)</TableCell>
                        <TableCell align="right">CORRECTNESS_SCORE&nbsp;(g)</TableCell>
                        <TableCell align="right">BUS_FACTOR_SCORE&nbsp;(g)</TableCell>
                        <TableCell align="right">RESPONSIVE_MAINTAINER_SCORE&nbsp;(g)</TableCell>
                        <TableCell align="right">PINNING_FRACTION&nbsp;(g)</TableCell>
                        <TableCell align="right">PR_FRACTION&nbsp;(g)</TableCell>
                        <TableCell align="right">LICENSE_SCORE&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}