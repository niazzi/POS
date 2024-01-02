import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Categories = () => {
  const colors = [
    { value: "#FF0000", label: "Red" },
    { value: "#00FF00", label: "Green" },
    { value: "#0000FF", label: "Blue" },
    // Add more color options as needed
  ];

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
    categoryColor: Yup.string().required("Category Color is required"),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      categoryColor: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Add Category
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            label="Category Name"
            variant="outlined"
            margin="normal"
            fullWidth
            name="categoryName"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
            //helperText={formik.touched.categoryName && formik.errors.categoryName}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="color-select-label">Category Color</InputLabel>
            <Select
              labelId="color-select-label"
              label="Category Color"
              name="categoryColor"
              value={formik.values.categoryColor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.categoryColor && Boolean(formik.errors.categoryColor)}
              inputProps={{
                name: "categoryColor",
              }}
            >
              {colors.map((color) => (
                <MenuItem key={color.value} value={color.value}>
                  <div
                    style={{
                      backgroundColor: color.value,
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  ></div>
                  {color.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Categories;
