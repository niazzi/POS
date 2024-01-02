import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemIcon,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RefundComponent from "./RefundComponent";

const ReceiptsShow = () => {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptList, setReceiptList] = useState([]);
  const [showRefundComponent, setShowRefundComponent] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Adjust the number of rows per page as needed

  useEffect(() => {
    const fetchSalePayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/salepayments"
        );
        setReceiptList(response.data.salePayments);
      } catch (error) {
        console.error("Error fetching sale payments:", error);
      }
    };

    fetchSalePayments();
  }, []);

  const filteredReceipts = receiptList.filter((receipt) =>
    `Receipt ${receipt.receiptNumber}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const fetchReceiptDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/salepayment/${id}`
      );
      setSelectedReceipt(response.data.salePayment);
    } catch (error) {
      console.error("Error fetching receipt details:", error);
    }
  };

  const handleReceiptClick = (receipt) => {
    fetchReceiptDetails(receipt._id);
  };

  const handleRefund = () => {
    setShowRefundComponent(true);
  };

  //   const onCloseRefund = () => {
  //     setShowRefundComponent(false);

  //   };

  const onCloseRefund = async () => {
    setShowRefundComponent(false);

    try {
      const response = await axios.get(
        "http://localhost:4000/api/salepayments"
      );
      setReceiptList(response.data.salePayments);
    } catch (error) {
      console.error("Error fetching sale payments:", error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedReceipts = filteredReceipts.slice(startIndex, endIndex);

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      {/* Left Sidebar - Receipt List */}
      {!showRefundComponent && (
        <Paper elevation={3} sx={{ width: 300, padding: 1 }}>
          <Typography variant="h6" gutterBottom>
            Receipt List
          </Typography>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search Receipts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Table style={{ width: "100%" }}>
            <TableBody>
              {displayedReceipts.map((receipt) => (
                <TableRow
                  key={receipt.id}
                  onClick={() => handleReceiptClick(receipt)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell style={{ padding: "4px" }}>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                  </TableCell>

                  <TableCell
                    style={{ padding: "4px" }}
                  >{`Receipt# ${receipt.receiptNumber}`}</TableCell>
                  <TableCell style={{ padding: "4px" }}>
                    {receipt.billTotal ? (
                      <>
                        {receipt.billTotal.toFixed(2)}
                        <br />
                      </>
                    ) : (
                      "N/A"
                    )}
                    {receipt.refund ? (
                      <span
                        style={{ color: "red" }}
                      >{`Refund# ${receipt.refund.refundNumber}`}</span>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={filteredReceipts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

      {/* Main Content - Receipt Details or Refund Component */}
      <Box sx={{ flex: 1, padding: 0.5 }}>
        {showRefundComponent ? (
          <RefundComponent
            selectedReceipt={selectedReceipt}
            onCloseRefund={onCloseRefund}
          />
        ) : selectedReceipt ? (
          <Paper elevation={3} sx={{ padding: 3 }}>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRefund}
              >
                Refund
              </Button>
            </Box> */}
            {selectedReceipt.refund ? (
          // If the receipt has already been refunded, show the refund details
          <Typography variant="subtitle1" 
           sx={{
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 2,
      color: "red", // Replace with the actual color you want
    }}
          >
            <strong>Refund Number:</strong> {selectedReceipt.refund.refundNumber}
          </Typography>
        ) : (
          // If the receipt has not been refunded, show the Refund button
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRefund}
            >
              Refund
            </Button>
          </Box>
        )}
            <Box sx={{ padding: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
              >
                <Typography variant="subtitle1">
                  <strong>Total Bill:</strong> 
                  {selectedReceipt.billTotal.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="h6" gutterBottom>
                Receipt#{selectedReceipt.receiptNumber}
              </Typography>
              {selectedReceipt.customer && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Name:</strong> {selectedReceipt.customer.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {selectedReceipt.customer.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Mobile:</strong> {selectedReceipt.customer.phone}
                  </Typography>
                </>
              )}
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell>Sale Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedReceipt.itemDetails &&
                    selectedReceipt.itemDetails.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.itemCode}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.salePrice.toFixed(2)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="right"
                      sx={{ paddingRight: 9 }}
                    >
                      <Typography variant="subtitle1">
                        Total Bill: {selectedReceipt.billTotal.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Typography variant="h6">Select a receipt to view details</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ReceiptsShow;
