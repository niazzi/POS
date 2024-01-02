import React, { useState, useEffect } from "react";
import { Box, Paper ,Typography, TextField,Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from 'axios';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
//import { useFormik } from "formik";


const AfterPaymentItem = () => {
    const [mostRecentPayment, setMostRecentPayment] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMostRecentPayment = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/most-recent-payment');
            setMostRecentPayment(response.data);
          } catch (error) {
            console.error('Error fetching most recent payment:', error);
          }
        };
    
        fetchMostRecentPayment();
      }, []);
      const handleGoNewSale=()=>{
        navigate("/sale-side");
      }
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
              {mostRecentPayment && (
                mostRecentPayment.itemDetails.map((item) => (
                  <TableRow key={item.itemCode}>
                    <TableCell>{item.itemCode}</TableCell>
                    <TableCell align="right">{item.itemName}</TableCell>
                    <TableCell align="right">{item.salePrice}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.total}</TableCell>
                  </TableRow>
                ))
              )}

              {mostRecentPayment && (
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">{mostRecentPayment.billTotal}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="show-after-payment">
      {mostRecentPayment && (
    <Box className="afterPayment-totalAmount">
      <Typography>{mostRecentPayment.billTotal}</Typography>
      <h5>Total Amount Due</h5>
    </Box>
  )}
  <form>
          <Box className="after-payment-formEmail">
            <TextField
              type="email"
              label="Email"
              name="billTotal"
              variant="outlined"
              margin="normal"
              fullWidth
            //   InputProps={{
            //     startAdornment: (
            //       <InputAdornment position="start">
            //         <PaymentsIcon />
            //       </InputAdornment>
            //     ),
            //   }}
            //   {...formik.getFieldProps("billTotal")}
            //   error={
            //     formik.touched.billTotal && Boolean(formik.errors.billTotal)
            //   }
            //   helperText={formik.touched.billTotal && formik.errors.billTotal}
            />

            <Button
              type="submit"
           
              //startIcon={<PaymentsIcon />}
            //   disabled={formik.values.billTotal === 0}
             //disabled={itemDetails.length === 0}
            >
              SEND RECIEPT
            </Button>
          </Box>
        </form>
        <Box className="other-payment-way">
         
         
        <IconButton onClick={handleGoNewSale}>
            <CheckIcon />
            <Typography sx={{ marginLeft: "6px" }}>New Sale</Typography>
          </IconButton>
        </Box>
      </Box>
    </Box>

  )
}

export default AfterPaymentItem