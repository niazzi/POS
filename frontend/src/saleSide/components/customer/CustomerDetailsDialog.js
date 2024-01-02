import React, { useState,useEffect } from 'react';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Dialog, DialogContent, Typography, Button, Divider, Box, Paper } from '@mui/material';
import EditProfileDialog from './EditCustomerDialog'; // Import the new component
import ViewPuchasesCustomer from './ViewPuchasesCustomer';

const CustomerDetailsDialog = ({ open, onClose, onBackArrowClick, selectedCustomer, }) => {
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [viewPurchaseOpen, setViewPurchaseOpen] = useState(false);
    const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
    useEffect(() => {
        setCustomerDetailsOpen(open || false);
      }, [open]);
     

    const handleEditProfileClick = () => {
      setEditProfileOpen(true);
      setCustomerDetailsOpen(false); // Close CustomerDetailsDialog when EditProfileDialog is opened
    };
  
    const handleEditProfileClose = () => {
      setEditProfileOpen(false);
      setCustomerDetailsOpen(true); // Reopen CustomerDetailsDialog when EditProfileDialog is closed
    };
    const handleCustomerDetailsClose = () => {
        setCustomerDetailsOpen(false);
        onClose(); // Close CustomerDetailsDialog when needed
      };

      const handleViewPurchaseClick =()=>{
       
        setViewPurchaseOpen(true);
      setCustomerDetailsOpen(false); // Close CustomerDetailsDialog when EditProfileDialog is opened
      }
const handleViewPurchaseClose=()=>{
    setViewPurchaseOpen(false);
      setCustomerDetailsOpen(true);
}

      const onAddToTicketClick = () => {
        // Some logic to add to ticket
        console.log("selectedCustomer",selectedCustomer.salePayments)
        const {_id,customerCode, name, email, phone, /* other properties */ } = selectedCustomer;
       
    // Save to local storage
    const customerData = { _id,customerCode,name, email, phone /* other properties */ };
    localStorage.setItem('customerData', JSON.stringify(customerData));

        onClose(); // Closing the CustomerDetailsDialog
      };
  return (
    <>
    <Dialog open={customerDetailsOpen} onClose={handleCustomerDetailsClose} fullWidth maxWidth="md">
      <DialogContent>
        <Paper elevation={3} style={{ padding: 20, position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <IconButton
              edge="start"
              color="primary"
              onClick={onBackArrowClick}
              aria-label="back"
              sx={{
                background: 'white',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '50%',
                marginRight: 2,
                marginBottom: 2,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
           
            {selectedCustomer && (
              <Typography variant="h4" color="primary" gutterBottom>
                {selectedCustomer.name}
              </Typography>
            )}
            <Button
              color="primary"
              onClick={onAddToTicketClick}
              aria-label="add to ticket"
              sx={{
                background: 'white',
                //boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                //borderRadius: '50%',
              }}
            >
              ADD TO TICKET
            </Button>
          </Box>
          <Divider />
          {selectedCustomer && (
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <Typography variant="body1" color="textSecondary">
                Email: {selectedCustomer.email}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Phone: {selectedCustomer.phone}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Address: {selectedCustomer.address}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              City: {selectedCustomer.city}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Region: {selectedCustomer.region}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Postal Code: {selectedCustomer.postalCode}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Country: {selectedCustomer.country}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Customer Code: {selectedCustomer.customerCode}
              </Typography>
              <Typography variant="body1" color="textSecondary">
              Note: {selectedCustomer.note}
              </Typography>
             
              {/* Add more customer details as needed */}
            </Box>
          )}
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleEditProfileClick}>
                Edit Profile
              </Button>
              <Button variant="contained" color="primary" onClick={handleViewPurchaseClick}> 
                View Purchases
              </Button>
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
    <EditProfileDialog open={editProfileOpen} onClose={handleEditProfileClose} onBackArrowClick={handleEditProfileClose} />
    <ViewPuchasesCustomer open={viewPurchaseOpen} onClose={handleViewPurchaseClose} onBackArrowClick={handleViewPurchaseClose} selectedCustomer={selectedCustomer} />
    </>
  );
};

export default CustomerDetailsDialog;
