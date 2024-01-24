// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   Box,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const Categories = () => {
//   const colors = [
//     { value: "#FF0000", label: "Red" },
//     { value: "#00FF00", label: "Green" },
//     { value: "#0000FF", label: "Blue" },
//     // Add more color options as needed
//   ];

//   const validationSchema = Yup.object().shape({
//     categoryName: Yup.string().required("Category Name is required"),
//     categoryColor: Yup.string().required("Category Color is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       categoryName: "",
//       categoryColor: "",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       // Handle form submission logic here
//       console.log(values);
//     },
//   });

//   return (
//     <Paper
//       elevation={3}
//       style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Add Category
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <TextField
//             label="Category Name"
//             variant="outlined"
//             margin="normal"
//             fullWidth
//             name="categoryName"
//             value={formik.values.categoryName}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
//             //helperText={formik.touched.categoryName && formik.errors.categoryName}
//           />

//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel id="color-select-label">Category Color</InputLabel>
//             <Select
//               labelId="color-select-label"
//               label="Category Color"
//               name="categoryColor"
//               value={formik.values.categoryColor}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               error={formik.touched.categoryColor && Boolean(formik.errors.categoryColor)}
//               inputProps={{
//                 name: "categoryColor",
//               }}
//             >
//               {colors.map((color) => (
//                 <MenuItem key={color.value} value={color.value}>
//                   <div
//                     style={{
//                       backgroundColor: color.value,
//                       width: "20px",
//                       height: "20px",
//                       marginRight: "8px",
//                       borderRadius: "50%",
//                       display: "inline-block",
//                     }}
//                   ></div>
//                   {color.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             style={{ marginTop: "20px" }}
//           >
//             Submit
//           </Button>
//         </Box>
//       </form>
//     </Paper>
//   );
// };

// export default Categories;

import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  lime,
  purple,
  deepOrange,
  teal,
  pink,
  cyan,
  amber,
  indigo,
  brown,
  red,
  grey,
} from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  // palette: {
  //   primary: lime,
  //   secondary: purple,
  // },
});

const colorOptions = [
  deepOrange,
  teal,
  pink,
  cyan,
  amber,
  indigo,
  brown,
  red,
  lime,
  purple,
  grey,
];
const generateUniqueCategoryCode = (prefix = 'CAT') => {
  const randomPart = Math.random().toString(36).substring(2, 6);
  const timestampPart = Date.now().toString(36).substring(2, 6);
  return `${prefix}-${randomPart}-${timestampPart}`;
};
const Categories = () => {
  const navigate = useNavigate();
  const categorySchema = Yup.object().shape({
    categoryCode: Yup.string().required('Category Code is required'),
    categoryName: Yup.string()
      .required('Category Name is required')
      .min(1, 'Category Name must be at least 1 character')
      .max(64, 'Category Name must be at most 64 characters'),
    categoryColor: Yup.string().notRequired(),
  });
  const formik = useFormik({
    initialValues: {
      categoryCode: generateUniqueCategoryCode(),
      categoryName: "",
      categoryColor: colorOptions[0][500], // Set a default color
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { setFieldError,resetForm }) => {
      try {
        // Send a POST request to the backend API endpoint
        const response = await axios.post('http://localhost:4000/api/dashboard/createcategory', values);
  
        // Handle the response from the server as needed
        console.log('Response from the server:', response.data);
        resetForm();
        navigate('/item-category');
      } catch (error) {
        // Handle errors
        console.error('Error while submitting the form:', error);
  
        // Check if the error is related to Category Code uniqueness
        if (error.response && error.response.data && error.response.data.error === 'Category Code already exists') {
          // Set an error for the categoryCode field
          setFieldError('categoryCode', 'Category Code already exists');
        } else {
          // Handle other errors
          console.error('Unexpected error:', error);
        }
      }
    },
  });  
  const handleColorSelection = (color) => {
    // Handle the logic for color selection, e.g., set it in the form state
    formik.setFieldValue("categoryColor", color[500]);
  };
  const handleCategoryCodeChange = () => {
    const newCategoryCode = generateUniqueCategoryCode();
    formik.setFieldValue('categoryCode', newCategoryCode);
  };
  const handleCancel = () => {
    // Navigate to the desired route
    navigate('/item-category');
  };
  
  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      width="70%" // Set the desired width
      margin={"auto"}
    >
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          //maxWidth:"60%",
          // margin: "auto"
        }}
      >
        <Box mt={2} textAlign="center">
          <Typography variant="h5" >
            Add Category
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit} autoComplete="off">

        <TextField
        fullWidth
        type="text" 
        id="categoryCode"
        name="categoryCode"
        label="Category Code"
        value={formik.values.categoryCode}
        onChange={formik.handleChange}
        error={formik.touched.categoryCode && Boolean(formik.errors.categoryCode)}
        helperText={formik.touched.categoryCode && formik.errors.categoryCode}
        style={{ marginTop: '15px' }}
        InputProps={{
          endAdornment: (
            <button type="button" onClick={handleCategoryCodeChange}
            style={{ cursor: 'pointer' }}
            >
              Generate New Code
            </button>
          ),
        }}
      />
       
        {/* <TextField
            fullWidth
            type="number"
            id="categoryCode"
            name="categoryCode"
            label="Category Code"
            value={formik.values.categoryCode}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryCode && Boolean(formik.errors.categoryCode)
            }
            helperText={
              formik.touched.categoryCode && formik.errors.categoryCode
            }
            style={{ marginTop: "15px" }}
          /> */}
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Category Name"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryName && Boolean(formik.errors.categoryName)
            }
            helperText={
              formik.touched.categoryName && formik.errors.categoryName
            }
            style={{ marginTop: "15px" }}
          />
          {/* <TextField
          fullWidth
          id="categoryColor"
          name="categoryColor"
          label="Category Color"
          value={formik.values.categoryColor}
          onChange={formik.handleChange}
          error={formik.touched.categoryColor && Boolean(formik.errors.categoryColor)}
          helperText={formik.touched.categoryColor && formik.errors.categoryColor}
        /> */}

          <ThemeProvider theme={theme}>
            <div
              style={{ display: "flex", marginTop: "15px", flexWrap: "wrap" }}
            >
              {colorOptions.map((color, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    backgroundColor: color[500],
                    width: "60px",
                    height: "50px",
                    margin: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorSelection(color)}
                >
                  {formik.values?.categoryColor === color[500] && (
                    <CheckCircleIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </ThemeProvider>
          <Box mt={2} textAlign="right">
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Categories;
