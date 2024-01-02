import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

import { TextField,Card,CardMedia, Button, Box, Paper } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

// Import the necessary Material-UI components and icons
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StorageIcon from "@mui/icons-material/Storage";
const categories = ["Laptop", "Ultra", "HandFree", "Bluetooth"];
const validationSchema = Yup.object({
  itemCode: Yup.string().required("Item Code is required"),
  // itemName: Yup.string().required("Item Name is required"),
  // category: Yup.string().required("Category is required"),
  // Add other validations for your form fields
  // ...
});

const AddItem = () => {
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      itemCode: "",
      itemName: "",
      category: null,
      unit: "",
      purchasePrice: "",
      salePrice: "",
      wholesalePrice: "",
      minWholesaleQty: "",
      minStockQty: "",
      stockLocation: "",
      openingQtyStock: "",
      date: "",
      description: "",
      itemImage: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
    
        // Append the image file to the FormData object
        formData.append("itemImage", formik.values.itemImage);
    
         // Append other form data to the FormData object
         Object.keys(values).forEach((key) => {
          if (key !== 'itemImage') {
            formData.append(key, values[key]);
          }
        });
    
        // Send the FormData object to the backend
        const response = await axios.post("http://localhost:4000/api/add-item", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        console.log("Form submitted successfully:", response.data);
        navigate('/item-list')
    
        // Additional actions after successful submission
      } catch (error) {
        // Handle error response
        if (error.response && error.response.status === 400) {
          console.error("Item Code already exists:", error.response.data.error);
          // You can set a Formik error for the specific field
          formik.setFieldError("itemCode", "Item Code already exists");
        } else {
          // Other errors
          console.error("Error submitting the form:", error.message);
        }
      }
    },
    
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("itemImage", file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper elevation={3} className="add-item-paper">
        <Box className="add-item-avatar-container">
          <label htmlFor="itemImageInput">
          <Card>
        <CardMedia
          component="img"
          alt="Product Item Image"
          height="160"
          image={imagePreview || formik.values.itemImage}
        />
      </Card>
          </label>
          <input
            id="itemImageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </Box>
        <Box className="add-item-form-container">
          <Box className="add-item-form-field">
            <TextField
              type="text"
              label="Item Code"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.itemCode}
              onChange={formik.handleChange}
              name="itemCode"
              error={formik.touched.itemCode && Boolean(formik.errors.itemCode)}
              helperText={formik.touched.itemCode && formik.errors.itemCode}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Item Name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              value={formik.values.itemName}
              onChange={formik.handleChange}
              name="itemName"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              id="category-select"
              options={categories}
              value={formik.values.category}
              onChange={(event, newValue) => {
                formik.setFieldValue("category", newValue);
              }}
              onBlur={() => {
                formik.handleBlur("category");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Category"
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  //   helperText={formik.touched.role && formik.errors.role}
                />
              )}
            />
          </Box>
          <Box className="add-item-form-field">
            <TextField
              label="Unit"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.unit}
              onChange={formik.handleChange}
              name="unit"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdUnitsIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              label="Purchase Price"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.purchasePrice}
              onChange={formik.handleChange}
              name="purchasePrice"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              label="Sale Price"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.salePrice}
              onChange={formik.handleChange}
              name="salePrice"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box className="add-item-form-field">
            <TextField
              type="number"
              label="Wholesale Price"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.wholesalePrice}
              onChange={formik.handleChange}
              name="wholesalePrice"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOfferIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              label="Minimum Wholesale Qty"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.minWholesaleQty}
              onChange={formik.handleChange}
              name="minWholesaleQty"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalMallIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              label="Minimum Stock Quantity"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.minStockQty}
              onChange={formik.handleChange}
              name="minStockQty"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalMallIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="add-item-form-field">
            <TextField
              label="Stock Location"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.stockLocation}
              onChange={formik.handleChange}
              name="stockLocation"
              InputProps={{
                startAdornment: (
                  <LocationOnIcon color="action" fontSize="small" />
                ),
              }}
            />
            <TextField
              type="number"
              label="Opening Quantity Stock"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.openingQtyStock}
              onChange={formik.handleChange}
              name="openingQtyStock"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StorageIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="date"
              label=""
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.date}
              onChange={formik.handleChange}
              name="date"
            />
          </Box>

          <TextField
            label="Description"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={3}
            className="add-item-description-field"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />

          <Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Item
            </Button>
          </Box>
        </Box>
      </Paper>
    </form>
  );
};

export default AddItem;
