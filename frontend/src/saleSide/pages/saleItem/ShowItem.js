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
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
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

import axios from "axios";
import CustomerDialog from "../../components/customer/CustomerDialog";
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

const ShowItem = () => {
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
  const [openCustomerDialog, setOpenCustomerDialog] = useState(false);


  const navigate = useNavigate();


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
//   const arraysAreEqual = (array1, array2) => {
//     if (array1.length !== array2.length) {
//       return false;
//     }
  
//     for (let i = 0; i < array1.length; i++) {
//       if (array1[i] !== array2[i]) {
//         return false;
//       }
//     }
  
//     return true;
//   };
  // Define the handleLocalStorageChange function with useCallback
//   const handleLocalStorageChange = useCallback(() => {
//     // Logic to handle changes in local storage
//     const storedCartItems = localStorage.getItem('cartItems');
//     const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

//     // Compare the data in local storage with the current state
//     if (!arraysAreEqual(parsedCartItems, cartItems)) {
//       // Data mismatch, take appropriate action
//       // For example, reinitialize the state or fetch the data again
//       setCartItems(parsedCartItems);
//     }
//   }, [cartItems, setCartItems]); // Include any dependencies needed for the function

//   useEffect(() => {
//     // Check for changes in local storage periodically
//     const intervalId = setInterval(() => {
//       handleLocalStorageChange();
//     }, 3000); // Adjust the interval as needed

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, [handleLocalStorageChange]); // Include any dependencies needed for the check

  // Inside your component where you navigate to the payment page
  const handleChargeAmount = () => {
    // Pass itemDetails as state when navigating
    // navigate("/payment-item", { state: { itemDetails, billTotal } });
    navigate("/payment-item");
  };
  // Define the arraysAreEqual function
 // Function to handle opening the customer dialog
 const handleOpenCustomerDialog = () => {
    setOpenCustomerDialog(true);
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
        // Calculate the total price for the updated item
       
     
        // Update minStockQty in the database
        //updateMinStockQtyInDatabase(item.id,item.minStockQty - newCartItems[existingItemIndex].quantity);
        // Save to local storage
        console.log("New Cart Items",newCartItems);
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
      // Update minStockQty in the database
      //updateMinStockQtyInDatabase(item.id, Math.max(0, item.minStockQty - 1));
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

//   const updateMinStockQtyInDatabase = (itemId, newQuantity) => {
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
      <Box style={{  display: "flex",justifyContent: "space-around",marginTop: "20px", }}>
        <h2>Create Ticket</h2>
        <IconButton onClick={handleOpenCustomerDialog}>
        <PersonIcon />
      </IconButton>

      {/* Other components... */}

      {/* Customer Dialog */}
      <CustomerDialog
        open={openCustomerDialog}
        onClose={() => setOpenCustomerDialog(false)}
        //onAddToTicket={handleAddToTicket}
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

export default ShowItem;
