// CustomerDialog.js

import React,{useState,useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import AddCustomerForm from './AddCustomerForm';
import Axios from 'axios'; // import Axios
import CustomerDetailsDialog from './CustomerDetailsDialog'; // Import the CustomerDetailsDialog



const CustomerDialog = ({ open, onClose }) => {
  //const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomerFormOpen, setAddCustomerFormOpen] = useState(false);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  // const recentCustomers = [
  //   // Add your customer data here
  //   { id: 1, name: 'Muhammad Ali',email: 'muhammadali@gmail.com', mobile: '123-456-7890' },
  //   { id: 2, name: 'Muhammad Aslam',email: 'muhammadaslam@gmail.com', mobile: '123-456-7890' },
  //   { id: 3, name: 'Muhammad Arif',email: 'muhammadarif@gmail.com', mobile: '123-456-7890' },
  //   { id: 4, name: 'Muhammad Subtain',email: 'muhammadsubtain@gmail.com', mobile: '123-456-7890' },
  //   // Add more customers as needed
  // ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Make a GET request to fetch recent customers from your backend API
        const response = await Axios.get('http://localhost:4000/api/customers');

        // Update the state with the fetched customer data
        setRecentCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error.message);
      }
    };

    // Call the fetchCustomers function
    fetchCustomers();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts


  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
   
    // Close the main dialog and open the details dialog
    // onClose();
    setDetailsDialogOpen(true);
    
  };
  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };
  const handleAddNewCustomer = () => {
    setAddCustomerFormOpen(true);
   // onClose(); // Close the main dialog when opening the AddCustomerForm dialog
    
  };
  const handleAddCustomerFormClose = () => {
    setAddCustomerFormOpen(false);
    // Optionally, you can open the main dialog again when closing the AddCustomerForm dialog
    // onClose();
  };
  // Function to handle adding the selected customer to the ticket
  // const handleAddToTicket = () => {
  //   if (selectedCustomer) {
  //     // Perform any necessary logic before adding to the ticket
  //     // For example, update the customer icon in the cart bar
  //     // ...

  //     // Call the function from the ShowItem component to add the customer to the ticket
  //     onAddToTicket(selectedCustomer);

  //     // Close the dialog
  //     onClose();
  //   }
  // };

  return (
  <>
   
    <Dialog open={open} fullWidth maxWidth="md" sx={{ height: '70vh' }} onClose={onClose}>
     <Box>
   
      
      <DialogContent>
      <Box>
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
        {/* Display a list of customers or any other customer selection UI */}
        {/* When a customer is selected, update the selectedCustomer state */}
        {/* Add buttons for "Add to Ticket" and any other actions */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add Customer to Ticket
        </Typography>
        </Box>
       {/* Display customer details here */}
        {/* ... */}

        {/* Button to add the selected customer to the ticket */}
      
        <TextField
      fullWidth
      label="Search Customer"
      variant="outlined"
      margin="normal"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
     <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            {/* <IconButton>
              <AddCircleIcon />
            </IconButton> */}
            <IconButton onClick={handleAddNewCustomer}>
          
            <Typography>Add New Customer</Typography>
          </IconButton>
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Recent Customers
          </Typography>
          {/* List of recent customers */}
          <List>
            {recentCustomers.map((customer, index) => (
              <React.Fragment key={customer.id}>
                <ListItem button onClick={() => handleCustomerClick(customer)}>
                  {/* Display customer details */}
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText
                    primary={customer.name}
                    secondary={
                      <>
                        <Typography variant="body2">{customer.email}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {customer.phone}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < recentCustomers.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

      </DialogContent>
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
      {/* Details Dialog */}
      <CustomerDetailsDialog
            open={detailsDialogOpen}
           // onClose={() => setDetailsDialogOpen(false)}
           onClose={handleDetailsDialogClose}
            selectedCustomer={selectedCustomer}
          />
    </Dialog>
  
   
    <AddCustomerForm
        open={isAddCustomerFormOpen}
        onClose={handleAddCustomerFormClose}
        //onAddCustomer={handleAddCustomer}
      />
      
   </>
  );
};

export default CustomerDialog;
