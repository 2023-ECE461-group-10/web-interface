import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, setOpen, confirmAction }: any) => {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAgree = () => {
        confirmAction();
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                System Reset
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to reset the entire system?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='contained' onClick={handleClose} autoFocus>Disagree</Button>
                <Button onClick={handleAgree}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;