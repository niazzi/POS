import React, { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
//import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Axios from "axios"; // import Axios

import axios from "axios";
import CustomerDetailsDialog from "../../components/customer/CustomerDetailsDialog";
import AddCustomerForm from "../../components/customer/AddCustomerForm";
// const TAX_RATE = 0.07;

function ccyFormat(num) {
  if (typeof num === "number" && !isNaN(num)) {
    return num.toFixed(2);
  } else {
    return "Invalid";
  }
}

function priceRow(qty, unit) {
  return qty * unit;
}

const Item = () => {
  const [imageData, setImageData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [displayedQuantity, setDisplayedQuantity] = useState(
    selectedItem?.quantity
  );
  // New state to store item details
  const [itemDetails, setItemDetails] = useState([]);
  // State to manage the customer dialog
  // Add a state variable to manage the dialog open/close state
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [isCustomerDetailsDialogOpen, setCustomerDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddCustomerFormOpen, setAddCustomerFormOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Make a GET request to fetch recent customers from your backend API
        const response = await Axios.get("http://localhost:4000/api/customers");

        // Update the state with the fetched customer data
        setRecentCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error.message);
      }
    };

    // Call the fetchCustomers function
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Make an Axios request to fetch image data from your Node.js server
    axios
      .get("http://localhost:4000/api/items")
      .then((response) => {
        setImageData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching image data:", error);
      });
  }, []);

  useEffect(() => {
    // Update displayedQuantity when selectedItem?.quantity changes
    setDisplayedQuantity(selectedItem?.quantity);
  }, [selectedItem?.quantity]);

  useEffect(() => {
    // Update itemDetails whenever cartItems changes
    setItemDetails(
      cartItems.map((item) => ({
        itemId: item.id, // Assuming id represents the itemId in cartItems
        name: item.itemName,
        quantity: item.quantity,
        salePrice: item.salePrice,
        total: priceRow(item.quantity, item.salePrice),
      }))
    );
  }, [cartItems]);
  console.log("Show all Detail of items in Cart", itemDetails);
  // Load cartItems from local storage on component mount or initialization
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleCustomerIconClick = () => {
    const storedCustomerData = localStorage.getItem("customerData");
    if (storedCustomerData) {
      // If customer data is present in local storage, set it to selectedCustomer
      const customerData = JSON.parse(storedCustomerData);
      setSelectedCustomer(customerData);
      // Open the CustomerDetailsDialog when a customer is selected
      setCustomerDetailsDialogOpen(true);
      setOpenCustomerDialog(false);
    } else {
      // If no customer data is present, open the default customer dialog
      setOpenCustomerDialog(true);
    }
  };
  const handleCloseCustomerDialog = () => {
    setOpenCustomerDialog(false);
  };
  const handleListItemClick = (customer) => {
    setSelectedCustomer(customer);
    // Open the CustomerDetailsDialog when a ListItem is clicked
    setCustomerDetailsDialogOpen(true);
    setOpenCustomerDialog(false);
  };
  const handleDetailsDialogClose = () => {
    // Close the CustomerDetailsDialog
    setCustomerDetailsDialogOpen(false);
    setOpenCustomerDialog(true);
  };

  const handleBackArrowClick = () => {
    // Close the CustomerDetailsDialog
    setCustomerDetailsDialogOpen(false);
    // Show the CustomerDialog
    setOpenCustomerDialog(true);
  };

  const handleAddNewCustomer = () => {
    setAddCustomerFormOpen(true);
     setOpenCustomerDialog(false);
   // onClose(); // Close the main dialog when opening the AddCustomerForm dialog
    
  };
  const handleAddCustomerFormClose = () => {
    setAddCustomerFormOpen(false);
    setOpenCustomerDialog(true);
    // Optionally, you can open the main dialog again when closing the AddCustomerForm dialog
    // onClose();
  };

  const handleChargeAmount = () => {
    navigate("/payment-item");
  };

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      setCartItems((prevItems) => {
        const newCartItems = [...prevItems];
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          //   quantity: newCartItems[existingItemIndex].quantity + 1,
          quantity: Math.min(
            newCartItems[existingItemIndex].quantity + 1,
            item.minStockQty
          ),
          total: priceRow(
            newCartItems[existingItemIndex].quantity + 1,
            item.salePrice
          ),
        };

        console.log("New Cart Items", newCartItems);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));

        return newCartItems;
      });
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCartItems((prevItems) => [
        ...prevItems,
        {
          ...item,
          quantity: Math.min(1, item.minStockQty),
          total: priceRow(1, item.salePrice), // Calculate total for the new item
        },
      ]);
      // Save to local storage
      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...cartItems,
          {
            ...item,
            quantity: Math.min(1, item.minStockQty),
            total: priceRow(1, item.salePrice), // Calculate total for the new item
          },
        ])
      );
    }
  };

  const openQuantityDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const closeQuantityDialog = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const increaseQuantity = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const newCartItems = [...prevItems];

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: Math.min(
            newCartItems[existingItemIndex].quantity + 1,
            item.minStockQty
          ),
          total: priceRow(
            newCartItems[existingItemIndex].quantity + 1,
            item.salePrice
          ),
        };
        // Update minStockQty in the database
        //updateMinStockQtyInDatabase(item.id,item.minStockQty - newCartItems[existingItemIndex].quantity);
        // Update displayed quantity
        setDisplayedQuantity(newCartItems[existingItemIndex].quantity);
      }
      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return newCartItems;
    });
  };
  const decreaseQuantity = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const newCartItems = [...prevItems];

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: Math.max(newCartItems[existingItemIndex].quantity - 1, 0),
          total: priceRow(
            newCartItems[existingItemIndex].quantity - 1,
            item.salePrice
          ),
        };
        // Update minStockQty in the database
        //updateMinStockQtyInDatabase(item.id,item.minStockQty - newCartItems[existingItemIndex].quantity);
        // Update displayed quantity
        setDisplayedQuantity(newCartItems[existingItemIndex].quantity);
      }
      // Save to local storage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const removeItem = (item) => {
    // Remove the item from the cart
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== item.id)
    );
    console.log("minStockQty in Database" + item.minStockQty);
    // Update minStockQty in the database
    //updateMinStockQtyInDatabase(item.id, item.minStockQty);
    // Save to local storage
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  //     console.log(
  //       "Updating MinStockQty. Item ID:",
  //       itemId,
  //       "New Quantity:",
  //       newQuantity
  //     );
  //     // Make an Axios request to your backend to update the quantity
  //     axios
  //       .put(`http://localhost:4000/api/items/${itemId}`, {
  //         minStockQty: newQuantity,
  //       })
  //       .then((response) => {
  //         console.log("MinStockQty updated in the database:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating item quantity:", error);
  //         // Handle error if needed
  //       });
  //   };

  //   const billSubtotal = cartItems.reduce((sum, item) => sum + priceRow(item.quantity, item.salePrice), 0);
  //const billTaxes = TAX_RATE * billSubtotal;
  //const billTotal = billTaxes + billSubtotal;
  const billTotal = cartItems.reduce(
    (sum, item) => sum + priceRow(item.quantity, item.salePrice),
    0
  );
  // Effect to save billTotal to local storage when it changes
  useEffect(() => {
    localStorage.setItem("billTotal", JSON.stringify(billTotal));
  }, [billTotal]);
  //localStorage.setItem('billTotal', JSON.stringify(billTotal));

  return (
    <div style={{ display: "flex" }}>
      <Box>
        <ImageList sx={{ width: 750, height: "auto" }} cols={5}>
          {imageData.map((item) => {
            const correctedImageUrl = `http://localhost:4000${item.itemImage.replace(
              "./public",
              "/public"
            )}`;

            return (
              <ImageListItem key={item.id} onClick={() => addToCart(item)}>
                <img
                  src={correctedImageUrl}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <ImageListItemBar
                  title={item.itemName}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.itemName}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                  sx={{ width: "100%", height: "20%" }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
      <Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <h2>Create Ticket</h2>
          <IconButton>
            <PersonIcon onClick={handleCustomerIconClick} />
          </IconButton>

          {/* Other components... */}

          {/* Customer Dialog */}
          {/* Customer Dialog */}
          <Dialog
            open={openCustomerDialog}
            fullWidth
            maxWidth="md"
            sx={{ height: "70vh" }}
            onClose={() => setOpenCustomerDialog(false)}
          >
            {/* ... (dialog content) */}
            <DialogContent>
              <Box>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleCloseCustomerDialog}
                  aria-label="close"
                  sx={{
                    position: "absolute",
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
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
                    <ListItem button onClick={() =>handleListItemClick(customer)}>
                      {/* Display customer details */}
                      <PersonIcon sx={{ mr: 1 }} />
                      <ListItemText
                        primary={customer.name}
                        secondary={
                          <>
                            <Typography variant="body2">
                              {customer.email}
                            </Typography>
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
            <DialogActions>
              <Button onClick={handleCloseCustomerDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <CustomerDetailsDialog
        open={isCustomerDetailsDialogOpen}
        onClose={handleDetailsDialogClose}
        // Pass any necessary data to the CustomerDetailsDialog component
        // For example: customerData={selectedCustomerData}
        selectedCustomer={selectedCustomer}
        onBackArrowClick={handleBackArrowClick} // Pass the function
      />
       <AddCustomerForm
        open={isAddCustomerFormOpen}
        onClose={handleAddCustomerFormClose}
        //onAddCustomer={handleAddCustomer}
      />
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 200 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.itemName}</TableCell>

                  <TableCell
                    align="right"
                    onClick={() => openQuantityDialog(item)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    {ccyFormat(item.salePrice)}
                  </TableCell>
                  <TableCell align="right">
                    {ccyFormat(priceRow(item.quantity, item.salePrice))}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      sx={{ color: "rgba(255, 0, 0, 0.54)" }}
                      aria-label={`remove ${item.itemName}`}
                      onClick={() => removeItem(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={2} />

                <TableCell colSpan={1}>Total</TableCell>
                <TableCell align="right">{ccyFormat(billTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Box style={{ margin: "0 10px" }}>
            <Button
              variant="contained"
              color="primary"
              //    onClick={handleSaveTicket}
              disabled={cartItems.length === 0} // Disable the button if cart is empty
              style={{ width: "150px", height: "50px" }}
            >
              Save
            </Button>
          </Box>
          <Box style={{ margin: "0 10px" }}>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleCharge}
              onClick={handleChargeAmount}
              disabled={cartItems.length === 0} // Disable the button if cart is empty
              style={{ width: "150px", height: "50px" }}
            >
              Charge
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={closeQuantityDialog}>
        <DialogContent>
          <Box>
            <h3>Item Quantity</h3>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <IconButton onClick={() => decreaseQuantity(selectedItem)}>
              <RemoveCircleIcon style={{ fontSize: "2rem" }} />
            </IconButton>
            {/* <span>{selectedItem?.quantity}</span> */}
            <span>{displayedQuantity}</span>
            <IconButton onClick={() => increaseQuantity(selectedItem)}>
              <AddCircleIcon style={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeQuantityDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Item;
