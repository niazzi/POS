// AddCustomerForm.js
import React from 'react';
import {
  Dialog,
  DialogContent,
  // DialogActions,
  // Button,
  // TextField,
  IconButton,
} from '@mui/material';
import Customer from '../../../customer/Customer';
import CloseIcon from '@mui/icons-material/Close';

const AddCustomerForm = ({ open, onClose, onAddCustomer }) => {
    const handleCustomerSubmitSuccess = () => {
        // Call the onClose function to close the dialog
        onClose();
      };

  return (
    <Dialog open={open} fullWidth maxWidth="md" sx={{ height: '70vh' }} onClose={onClose}>
      <DialogContent>
      <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
       
        <Customer onSubmitSuccess={handleCustomerSubmitSuccess}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;
