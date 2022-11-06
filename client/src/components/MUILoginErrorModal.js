import { useContext} from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/Alert'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUILoginErrorModal() {

    const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    function handleClose(event) {
        auth.hideErrorModal();
    }

    return (
        <div>
        <Modal
          open={auth.errormodal === true}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">{auth.errormess}</Alert>
          </Stack>
          <Button id="dialog-ok-button"
            className =  "modal-button"
            onClick={handleClose}>
            Close
          </Button>
          </Box>
        </Modal>
      </div>
    );
}