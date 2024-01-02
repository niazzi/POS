// EditProfileDialog.js
import React from 'react';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Dialog, DialogContent, Typography, Button, Box } from '@mui/material';

const EditProfileDialog = ({ open, onClose, onBackArrowClick }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
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
          <Typography variant="h4" color="primary" gutterBottom>
            Edit Profile
          </Typography>
        </Box>
        {/* Add the content for Edit Profile here */}
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
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
