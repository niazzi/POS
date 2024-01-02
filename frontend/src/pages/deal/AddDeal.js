import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AddDeal = () => {
    const formik = useFormik({
        initialValues: {
          dealCode: "",
          dealName: "",
          dealPrice: "",
          // Add initial values for other fields
          items: [
            {
              itemCode: "",
              itemName: "",
              itemQty: "",
              salePrice: "",
              discount: "",
              offerPrice: "",
              totalPrice: "",
            },
          ],
        },
        
        onSubmit: (values) => {
          // Handle form submission logic here
          console.log(values);
        },
      });


const handleAddItem = () => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      items: [
        ...prevValues.items,
        {
          itemCode: "",
          itemName: "",
          itemQty: "",
          salePrice: "",
          discount: "",
          offerPrice: "",
          totalPrice: "",
        },
      ],
    }));
  };



const handleDeleteItem = (index) => {
    const newItems = [...formik.values.items];
    newItems.splice(index, 1);

    formik.setValues({
      ...formik.values,
      items: newItems,
    });
  };

  
  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "100%", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Deal Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent={{
            xs: "flex-start",
            md: "flex-end",
            lg: "space-around",
          }}
          p={2}
        >
          <Box width={"25%"} p={1}>
            <TextField
              label="Deal Code"
              fullWidth
              value={formik.values.dealCode}
              onChange={formik.handleChange}
              name="dealCode"
            />
          </Box>
          <Box width={"25%"} p={1}>
            <TextField
              label="Deal Name"
              fullWidth
              value={formik.values.dealName}
              onChange={formik.handleChange}
              name="dealName"
            />
          </Box>
          <Box width={"25%"} p={1}>
            <TextField
              type="number"
              label="Deal Price"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formik.values.dealPrice}
              onChange={formik.handleChange}
              name="dealPrice"
             
            />
          </Box>
          {/* Add other deal fields here */}
        </Box>

        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Items
        </Typography>
       
        {formik.values.items.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            justifyContent={{
              xs: "flex-start",
              md: "flex-end",
              lg: "space-between",
            }}
            //   marginBottom="10px"
          >
            <Box width={"12%"} p={1}>
              <TextField
                label="Item Code"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].itemCode}
                onChange={formik.handleChange}
                name={`items[${index}].itemCode`}
              />
            </Box>
            <Box width={"18%"} p={1}>
              <TextField
                label="Item Name"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].itemName}
                onChange={formik.handleChange}
                name={`items[${index}].itemName`}
              />
            </Box>
            <Box width={"12%"} p={1}>
              <TextField
                type="number"
                label="Item Qty"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].itemQty}
                onChange={formik.handleChange}
                name={`items[${index}].itemQty`}
              />
            </Box>
            <Box width={"12%"} p={1}>
              <TextField
                type="number"
                label="Sale Price"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].salePrice}
                onChange={formik.handleChange}
                name={`items[${index}].salePrice`}
              />
            </Box>
            <Box width={"13%"} p={1}>
              <TextField
                type="number"
                label="Discount"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].discount}
                onChange={formik.handleChange}
                name={`items[${index}].discount`}
              />
            </Box>
            <Box width={"12%"} p={1}>
              <TextField
                type="number"
                label="Offer Price"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].offerPrice}
                onChange={formik.handleChange}
                name={`items[${index}].offerPrice`}
              />
            </Box>
            <Box width={"15%"} p={1}>
              <TextField
                type="number"
                label="Total Price"
                fullWidth
                variant="outlined"
                value={formik.values.items[index].totalPrice}
                onChange={formik.handleChange}
                name={`items[${index}].totalPrice`}
              />
            </Box>
            <Box  width={"2%"} p={0}>
              <IconButton onClick={() => handleDeleteItem(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {/* Add other item fields here */}
          </Box>
        ))}
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent={{
            xs: "flex-start",
            md: "flex-end",
            lg: "space-around",
          }}
        >
          <Box>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              Add Item
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        {/* </Box> */}
      </form>
    </Paper>
  );
};

export default AddDeal;
