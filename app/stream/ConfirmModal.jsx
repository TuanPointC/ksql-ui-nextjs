import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import { useThemeStore } from '@/store';
import './ConfirmModal.scss'
import axios from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const ConfirmModal = ({ open, setOpen, currentStream, setdataTable, dataTable, streams, setStreams}) => {
  const { theme } = useThemeStore()
  const handleClose = () => {
    setOpen(false)

  }

  const dropStream = async () => {
    await axios.post(`/api/query`, {
      query: `DROP STREAM ${currentStream};`
    });

    toast.success(`Drop stream successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === 'dark' ? "dark" : 'light'
    });
    setOpen(false)
    setdataTable(dataTable.filter(e => e.name != currentStream))
    setStreams(streams.filter(e => e.name != currentStream))
  }

  return (
    <div>
      <BootstrapDialog className='modal-confirm'
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Confirm Action
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Do you want to drop stream <b>{currentStream}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={dropStream}>
            Yes, Drop it!
          </Button>
        </DialogActions>
      </BootstrapDialog>
      <ToastContainer />
    </div>
  );
}


export default ConfirmModal

