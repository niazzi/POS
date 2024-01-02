import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RefundComponent = ({ selectedReceipt, onCloseRefund }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [refundedItems, setRefundedItems] = useState([]);
  const [refundedQuantities, setRefundedQuantities] = useState({});

  useEffect(() => {
    const fetchRefundedItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/get-refunded-items?refundNumber=${selectedReceipt.receiptNumber}`
        );
        console.log("API Response:", response.data);

        // Check if response.data.refund exists and is an array
        if (Array.isArray(response.data.refund)) {
          // Extract refunded quantities based on itemCode
          const quantities = {};
          response.data.refund.forEach((refund) => {
            refund.refundedItems.forEach((item) => {
              console.log("Item:", item); // Log each item to inspect its structure
              const itemCode = item.itemCode;
              const quantity = item.quantity;

              // If the itemCode already exists, accumulate the quantity
              if (quantities[itemCode]) {
                quantities[itemCode] += quantity;
              } else {
                // If the itemCode is encountered for the first time, set the quantity
                quantities[itemCode] = quantity;
              }
            });
          });

          // Set the accumulated quantities in state
          setRefundedQuantities(quantities);

          // Set the refunded items in state
          setRefundedItems(response.data.refund);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching refunded items:", error);
      }
    };

    fetchRefundedItems();
  }, [selectedReceipt.receiptNumber]);

  console.log("Refunded Items State:", refundedItems);

  const refundedTotal = selectedItems
    .reduce((total, item) => total + item.salePrice * item.quantity, 0)
    .toFixed(2);
  const handleRefund = async () => {
    try {
      // Prepare the data to be sent to the backend
      const requestData = {
        receiptNumber: selectedReceipt.receiptNumber,
        refundedItems: selectedItems.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          salePrice: item.salePrice,
          quantity: item.quantity,
          total: item.salePrice * item.quantity,
        })),
        refundedTotal: refundedTotal,
      };

      // Make an Axios request to your backend API
      const response = await axios.post(
        "http://localhost:4000/api/create-sale-payment-and-refund",
        requestData
      );

      // Handle the response from the server if needed
      console.log("Server response:", response.data);
      // Update stock for each refunded item
      for (const item of selectedItems) {

        // Fetch the current stock quantity from the database
      const stockResponse = await axios.get(
        `http://localhost:4000/api/items/${item.itemCode}`
      );


        const currentMinStockQty = stockResponse.data.minStockQty || 0;
      const updatedMinStockQty = currentMinStockQty + item.quantity;

        await axios.put(`http://localhost:4000/api/updateMinStockQty/${item.itemCode}`, {
          minStockQty: updatedMinStockQty,
        });
      }
      // Close the refund component
      onCloseRefund();
      //  navigate('/receipts')
    } catch (error) {
      console.error("Error during refund:", error);
      // Handle the error appropriately (e.g., show an error message)
    }
  };

  const handleItemClick = (item, isRefundedTable) => {
    const refundedQuantity = refundedQuantities[item.itemCode] || 0;

    if (isRefundedTable) {
      // Remove the clicked item from selectedItems
      setSelectedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.itemCode !== item.itemCode)
      );
    } else {
      // Check if the item is not fully refunded
      if (refundedQuantity < item.quantity) {
        // Check if the item is not already in selectedItems
        if (
          !selectedItems.find(
            (selectedItem) => selectedItem.itemCode === item.itemCode
          )
        ) {
          // Add the clicked item to selectedItems
          setSelectedItems((prevItems) => [
            ...prevItems,
            { ...item, quantity: 1 },
          ]);
        }
      }
    }
  };

  const handleIncrement = (index, e) => {
    e.stopPropagation(); // Stop the event propagation
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) => {
        if (i === index) {
          // Ensure the quantity doesn't exceed the remaining quantity
          const originalQuantity = selectedReceipt.itemDetails[i].quantity;
          const refundedQuantity = refundedQuantities[item.itemCode] || 0; // Use item.itemCode as the key
          const remainingQuantity = originalQuantity - refundedQuantity;
          const updatedQuantity = Math.min(
            item.quantity + 1,
            remainingQuantity
          );
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  const handleDecrement = (index, e) => {
    // Decrement the quantity for the specified item in selectedItems, ensuring it doesn't go below 1
    e.stopPropagation(); // Stop the event propagation
    setSelectedItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 3 }}>
      {/* Arrow Back Icon */}
      <IconButton
        onClick={onCloseRefund}
        sx={{ marginBottom: 2, alignSelf: "flex-start" }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Display both tables in a row layout */}
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
        {/* Table for selectedReceipt.itemDetails */}
        <Box sx={{ width: "45%", height: "600px", marginRight: 2 }}>
          <Typography variant="h6" gutterBottom>
            Receipt#{selectedReceipt.receiptNumber}
          </Typography>
          <TableContainer component={Paper} sx={{ height: "100%" }}>
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
                  selectedReceipt.itemDetails.map((item, index) => {
                    const refundedQuantity =
                      refundedQuantities[item.itemCode] || 0;
                    const isFullyRefunded = refundedQuantity >= item.quantity;

                    return (
                      <TableRow
                        key={index}
                        onClick={() => handleItemClick(item, false)}
                      >
                        <TableCell>{item.itemCode}</TableCell>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.salePrice.toFixed(2)}</TableCell>
                        <TableCell
                          style={{
                            color: isFullyRefunded ? "red" : "inherit",
                            width: "150px",
                          }}
                        >
                          {item.quantity}
                          <br />(
                          {isFullyRefunded
                            ? "Fully Refunded"
                            : `Refunded: ${refundedQuantity}`}
                          )
                        </TableCell>
                        <TableCell>{item.total.toFixed(2)}</TableCell>
                        {/* <TableCell>{refundedQuantity}</TableCell> */}
                      </TableRow>
                    );
                  })}

                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <strong>Total Bill:</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>${selectedReceipt.billTotal.toFixed(2)}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Table for selectedItems */}
        <Box sx={{ flexGrow: 1, height: "600px" }}>
          <Typography variant="h6" gutterBottom>
            Refunded Receipt
          </Typography>
          <TableContainer component={Paper} sx={{ height: "100%" }}>
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
                {selectedItems.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleItemClick(item, true)}
                  >
                    <TableCell>{item.itemCode}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.salePrice.toFixed(2)}</TableCell>

                    <TableCell>
                      <Button onClick={(e) => handleDecrement(index, e)}>
                        -
                      </Button>
                      {selectedItems[index].quantity}
                      <Button onClick={(e) => handleIncrement(index, e)}>
                        +
                      </Button>
                    </TableCell>
                    <TableCell>
                      {(item.salePrice * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <strong>Total Bill:</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {selectedItems
                        .reduce(
                          (total, item) =>
                            total + item.salePrice * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </TableCell>
                </TableRow>
                {selectedItems.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRefund}
                      >
                        Refund {refundedTotal}
                      </Button>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default RefundComponent;
