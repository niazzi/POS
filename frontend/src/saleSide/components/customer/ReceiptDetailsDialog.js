import React from 'react';
import { Dialog, DialogContent, Typography, Button, Divider, Box, Paper } from '@mui/material';

const ReceiptDetailsDialog = ({ open, onClose, receiptDetails }) => {
//   if (!open || !receiptDetails) {
//     return null;
//   }
if (!open || !receiptDetails || !receiptDetails.receipt) {
    return null;
  }

  const { receipt, customerName } = receiptDetails;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <Paper elevation={3} style={{ padding: 20, position: 'relative' }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Receipt Details
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <Typography variant="body1" color="textPrimary">
              Receipt Number: {receipt.receiptNumber}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              Customer Name: {customerName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Bill Total: {receipt.billTotal}
            </Typography>
            <Typography variant="body1" color="textSecondary" mt={2}>
              Item Details:
            </Typography>
            {receipt.itemDetails.map((item, index) => (
              <Box key={index} sx={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
                <Typography variant="body1" color="textSecondary">
                  Item Code: {item.itemCode}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Item Name: {item.itemName}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Sale Price: {item.salePrice}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Total: {item.total}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDetailsDialog;
