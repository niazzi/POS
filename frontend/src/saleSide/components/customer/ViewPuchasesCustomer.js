// // EditProfileDialog.js
// import React from 'react';
// import IconButton from "@mui/material/IconButton";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Dialog, DialogContent, Typography, Button,Divider, Box } from '@mui/material';

// const ViewPuchasesCustomer = ({ open, onClose, onBackArrowClick,selectedCustomer  }) => {
//   if (!selectedCustomer || !selectedCustomer.salePayments) {
//     // Handle the case when selectedCustomer or salePayments is null
//     return null; // or display a message, return an empty list, etc.
//   }
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogContent>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginBottom: 2,
//           }}
//         >
//           <IconButton
//             edge="start"
//             color="primary"
//             onClick={onBackArrowClick}
//             aria-label="back"
//             sx={{
//               background: 'white',
//               boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//               borderRadius: '50%',
//               marginRight: 2,
//               marginBottom: 2,
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h4" color="primary" gutterBottom>
//             View Purchase
//           </Typography>
//         </Box>
//         <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
//           {selectedCustomer.salePayments.map((salePayment) => (
//             <div key={salePayment._id}>
//               <Typography variant="body1" color="textSecondary">
//                 Bill Total: {salePayment.billTotal}
//               </Typography>
//               {/* Add more salePayment details as needed */}
//               <Divider />
//             </div>
//           ))}
//         </Box>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'flex-end',
//             marginTop: 2,
//           }}
//         >
//           <Button onClick={onClose} variant="contained" color="primary">
//             Close
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ViewPuchasesCustomer;

import React, { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
} from '@mui/material';
import ReceiptDetailsDialog from './ReceiptDetailsDialog';

const ViewPurchasesCustomer = ({ open, onClose, onBackArrowClick, selectedCustomer }) => {
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [viewPurchasesCustomerOpen, setViewPurchasesCustomerOpen] = useState(false);
  useEffect(() => {
    setViewPurchasesCustomerOpen(open || false);
  }, [open]);

  const handleOpenReceiptDialog = (salePayment) => {
    // setSelectedReceipt(receipt);
    setSelectedReceipt({ receipt: salePayment, customerName: selectedCustomer.name });
    setReceiptDialogOpen(true);
    setViewPurchasesCustomerOpen(false);
  };

  const handleCloseReceiptDialog = () => {
    setSelectedReceipt(null);
    setReceiptDialogOpen(false);
    setViewPurchasesCustomerOpen(true); 
  };
  if (!selectedCustomer || !selectedCustomer.salePayments) {
    // Handle the case when selectedCustomer or salePayments is null
    return null; // or display a message, return an empty list, etc.
  }

  return (
    <>
    <Dialog  open={viewPurchasesCustomerOpen} onClose={onClose} fullWidth maxWidth="md">
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
            <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'center', flex: 1 }}>
              View Purchases
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            {selectedCustomer.salePayments.map((salePayment) => (
              <Paper key={salePayment._id} elevation={2} style={{ padding: 10, marginBottom: 10,cursor: 'pointer', }}
              onClick={() => handleOpenReceiptDialog(salePayment)}
              >
                <Typography variant="body1" color="textPrimary">
                  Receipt Number: {salePayment.receiptNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Bill Total: {salePayment.billTotal}
                </Typography>
                {/* Add more salePayment details as needed */}
              </Paper>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 2,
            }}
          >
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
    <ReceiptDetailsDialog open={receiptDialogOpen} onClose={handleCloseReceiptDialog} receiptDetails={selectedReceipt} />
    </>
  );
};

export default ViewPurchasesCustomer;

