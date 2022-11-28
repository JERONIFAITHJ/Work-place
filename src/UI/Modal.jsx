import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '70%', sm: '70%', md: '400px', lg: '400px'},
  bgcolor: 'background.paper',
  borderRadius: '10px',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

export default function ModalWindow(props) {
  const [open, setOpen] = React.useState(props.show);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={{color: 'red'}} variant="h6" component="h2">
            Invalid Entry
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}