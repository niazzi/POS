import React from "react";
//import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PaymentItem = () => {
  const navigate = useNavigate();
//   const location = useLocation();
  // Retrieve values from local storage
  const itemDetails = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("ItemDetais get from local Storage",itemDetails)
  //const billTotal = parseFloat(localStorage.getItem("billTotal")) || 0;
  const storedBillTotal = localStorage.getItem("billTotal");
const billTotal = JSON.parse(storedBillTotal);


// Retrieve customer information from local storage
const customerData = JSON.parse(localStorage.getItem("customerData")) || {};
console.log("customerData",customerData);
const customerCode = customerData.customerCode || '';
const customerId = customerData._id || '';
const customerName = customerData.name || '';
const customerEmail = customerData.email || '';
const customerPhone = customerData.phone || '';

// Now, parsedBillTotal contains the value retrieved from local storage

 // const { itemDetails, billTotal } = location.state;
  // Initial value for billTotal
  //const [paymentCharged, setPaymentCharged] = useState(false);
  // Use state to store itemDetails and billTotal
//   const [itemDetails, setItemDetails] = useState([]);
//   const [billTotal, setBillTotal] = useState(0);
//   useEffect(() => {
//     // Get values from local storage
//     const storedItemDetails = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const storedBillTotal = parseFloat(localStorage.getItem("cartItems")) || 0;

//     // Update state with values from local storage
//     setItemDetails(storedItemDetails);
//     setBillTotal(storedBillTotal);
//   }, []);
  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    billTotal: Yup.number().required("Bill Total is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
        billTotal: (billTotal && typeof billTotal === 'number') ? billTotal.toFixed(2) : 0, // Set the initial value from location.state or default to 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Calculate the quantity of each item
        const itemQuantities = {};
        itemDetails.forEach((item) => {
          itemQuantities[item.itemCode] = item.quantity;
        });
        console.log("Count Item Quantities", itemQuantities);
        // Create a data object to send to the backend
        const data = {
          itemDetails: itemDetails,
          billTotal: values.billTotal,
          customer: customerId
    ? {
        _id: customerId,
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        customerCode: customerCode,
      }
    : null,
          // Add other payment-related fields if needed
        };
        // const dummyData = {
        //     itemDetails: [
        //       { itemId: 'ITEM001', name: 'Product 1', quantity: 2, salePrice: 10, total: 20 },
        //       // Add more dummy items if needed
        //     ],
        //     billTotal: 100,
        //   };

        // Send a POST request to your backend API
        console.log("itemDetails before request", itemDetails);
        const response = await axios.post(
          "http://localhost:4000/api/sale-payment",
          data
        );

        // Handle the response as needed
        console.log("Response from server:", response.data);
        // Update the stock quantities in the database
        await updateStockQuantities(itemQuantities);
        //setPaymentCharged(true); // Set the state to indicate successful payment

        // Clear local storage
        localStorage.clear();
        navigate("/after-payment-item");
      } catch (error) {
        // Handle errors, e.g., show an error message to the user
        console.error("Error charging payment:", error);
      }
    },
  });

  const handleGoBack = () => {
    navigate("/sale-side");
  };

  // Function to update stock quantities in the database
  const updateStockQuantities = async (itemQuantities) => {
    try {
      // Iterate over itemQuantities and update the stock in the database
      for (const itemId in itemQuantities) {
        const quantity = itemQuantities[itemId];
        console.log("Current Quantity of Item in Cart", quantity);
        // Fetch the current stock quantity from the database
        const response = await axios.get(
          `http://localhost:4000/api/items/${itemId}`
        );
        const currentStock = response.data.minStockQty;
        console.log("Total Quantity of Item in Database", currentStock);
        // Calculate the updated stock quantity
        const updatedStock = currentStock - quantity;

        // Update the stock quantity in the database
        await axios.put(`http://localhost:4000/api/items/${itemId}`, {
          minStockQty: updatedStock,
        });
        console.log("Updated Quantity of Item in Database", updatedStock);
      }
    } catch (error) {
      console.error("Error updating stock quantities:", error);
    }
  };

  return (
    <Box style={{ display: "flex" }} justifyContent="center">
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Code</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Sale Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemDetails.map((item) => (
                <TableRow key={item.itemCode}>
                  <TableCell>{item.itemCode}</TableCell>
                  <TableCell align="right">{item.itemName}</TableCell>
                  <TableCell align="right">{item.salePrice}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.total}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={3} />
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">{billTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="show-total-payment">
        <Box className="totalAmountDueBox">
          <Typography>{billTotal}</Typography>
          <h5>Total Amount Due</h5>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="final-payment-formBox">
            <TextField
              type="number"
              label="Cash Recieved"
              name="billTotal"
              variant="outlined"
              margin="normal"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentsIcon />
                  </InputAdornment>
                ),
              }}
              {...formik.getFieldProps("billTotal")}
              error={
                formik.touched.billTotal && Boolean(formik.errors.billTotal)
              }
              helperText={formik.touched.billTotal && formik.errors.billTotal}
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<PaymentsIcon />}
            //   disabled={formik.values.billTotal === 0}
             disabled={itemDetails.length === 0}
            >
              CHARGE
            </Button>
          </Box>
        </form>

        <Box className="other-payment-way">
          <IconButton onClick={handleGoBack}>
            <ArrowBackIcon />
            <Typography sx={{ marginLeft: "6px" }}>BACK</Typography>
          </IconButton>
          <Button startIcon={<CreditCardIcon />}>CARD</Button>
          <Button startIcon={<LocalAtmIcon />}>CHECK</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentItem;
