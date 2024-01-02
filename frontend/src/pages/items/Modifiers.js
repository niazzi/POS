import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  IconButton,
  Typography,
  Paper,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Modifiers = () => {
  // const [modifiersName, setModifiersName] = useState("");
  // const [modifiers, setModifiers] = useState([{ optionName: "", price: "" }]);


  const validationSchema = Yup.object().shape({
    modifiersName: Yup.string().required("Modifiers Name is required"),
    modifiers: Yup.array().of(
      Yup.object().shape({
        optionName: Yup.string().required("Option Name is required"),
        price: Yup.string().required("Price is required"),
      })
    ),
  });
  const formik = useFormik({
    initialValues: {
      modifiersName: "",
      modifiers: [{ optionName: "", price: "" }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form values:", values);
    },
  });
    

  const handleAddModifier = () => {
    formik.setFieldValue("modifiers", [
      ...formik.values.modifiers,
      { optionName: "", price: "" },
    ]);
  };
  
  const handleDeleteModifier = (formik, index) => {
    const updatedModifiers = [...formik.values.modifiers];
    updatedModifiers.splice(index, 1);
    formik.setFieldValue("modifiers", updatedModifiers);
  };
  
  const handleModifierChange = (formik, index, field, value) => {
    const updatedModifiers = [...formik.values.modifiers];
    updatedModifiers[index][field] = value;
    formik.setFieldValue("modifiers", updatedModifiers);
  };
  

  

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
       
      }}
    >
      <Typography variant="h5" gutterBottom>
        Modifier Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
      <TextField
    label="Modifiers Name"
    variant="outlined"
    fullWidth
    name="modifiersName"
    value={formik.values.modifiersName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.modifiersName && Boolean(formik.errors.modifiersName)}
    helperText={formik.touched.modifiersName && formik.errors.modifiersName}
    style={{ marginBottom: "16px", width: "93%" }}
  />
    
    {formik.values.modifiers.map((modifier, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <TextField
        name={`modifiers[${index}].optionName`}
        //as={TextField}
        label="Option Name"
        variant="outlined"
        fullWidth
        value={modifier.optionName}
        onChange={(e) => handleModifierChange(formik, index, "optionName", e.target.value)}
        style={{ marginRight: "8px" }}
      />
             <TextField
        name={`modifiers[${index}].price`}
        //as={TextField}
        label="Price"
        variant="outlined"
        fullWidth
        value={modifier.price}
        onChange={(e) => handleModifierChange(formik, index, "price", e.target.value)}
        style={{ marginLeft: "8px" }}
      />
           <IconButton onClick={() => handleDeleteModifier(formik, index)}>
        <DeleteIcon />
      </IconButton>
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-start" mt={2}>
          <IconButton onClick={handleAddModifier}>
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "20%", margin: "0px 40%" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Modifiers;













// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   IconButton,
//   Typography,
//   Paper,
//   Button,
//   Box,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// const Modifiers = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
//   const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

//   const validationSchema = Yup.object().shape({
//     modifiersName: Yup.string().required("Modifiers Name is required"),
//     modifiers: Yup.array().of(
//       Yup.object().shape({
//         optionName: Yup.string().required("Option Name is required"),
//         price: Yup.string().required("Price is required"),
//       })
//     ),
//   });

//   const formik = useFormik({
//     initialValues: {
//       modifiersName: "",
//       modifiers: [{ optionName: "", price: "" }],
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Handle form submission logic here
//       console.log("Form values:", values);
//     },
//   });

//   const handleAddModifier = () => {
//     formik.setFieldValue("modifiers", [
//       ...formik.values.modifiers,
//       { optionName: "", price: "" },
//     ]);
//   };

//   const handleDeleteModifier = (formik, index) => {
//     const updatedModifiers = [...formik.values.modifiers];
//     updatedModifiers.splice(index, 1);
//     formik.setFieldValue("modifiers", updatedModifiers);
//   };

//   const handleModifierChange = (formik, index, field, value) => {
//     const updatedModifiers = [...formik.values.modifiers];
//     updatedModifiers[index][field] = value;
//     formik.setFieldValue("modifiers", updatedModifiers);
//   };

//   return (
//     <Paper
//       elevation={3}
//       style={{
//         padding: "20px",
//         maxWidth: "500px",
//         margin: "auto",
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         Modifier Form
//       </Typography>
//       <form onSubmit={formik.handleSubmit}>
//         <TextField
//           label="Modifiers Name"
//           variant="outlined"
//           fullWidth
//           name="modifiersName"
//           value={formik.values.modifiersName}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           error={formik.touched.modifiersName && Boolean(formik.errors.modifiersName)}
//           helperText={formik.touched.modifiersName && formik.errors.modifiersName}
//           style={{ marginBottom: "16px", width: "100%" }}
//         />

//         {formik.values.modifiers.map((modifier, index) => (
//           <Box
//             key={index}
//             display="flex"
//             flexDirection={isSmallScreen ? "column" : isMediumScreen ? "row" : "row"}
//             alignItems="center"
//             justifyContent="space-between"
//             mb={2}
//           >
//             <TextField
//               name={`modifiers[${index}].optionName`}
//               label="Option Name"
//               variant="outlined"
//               fullWidth
//               value={modifier.optionName}
//               onChange={(e) => handleModifierChange(formik, index, "optionName", e.target.value)}
//               style={{
//                 marginBottom: isSmallScreen ? "8px" : "0",
//                 marginRight: isSmallScreen ? "0" : isMediumScreen ? "8px" : "8px",
//               }}
//             />
//             <TextField
//               name={`modifiers[${index}].price`}
//               label="Price"
//               variant="outlined"
//               fullWidth
//               value={modifier.price}
//               onChange={(e) => handleModifierChange(formik, index, "price", e.target.value)}
//               style={{
//                 marginBottom: isSmallScreen ? "8px" : "0",
//                 marginLeft: isSmallScreen ? "0" : isMediumScreen ? "8px" : "8px",
//               }}
//             />
//             <IconButton onClick={() => handleDeleteModifier(formik, index)}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         ))}
//         <Box display="flex" justifyContent="flex-start" mt={2}>
//           <IconButton onClick={handleAddModifier}>
//             <AddIcon />
//           </IconButton>
//         </Box>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           style={{ width: "100%", marginTop: "16px" }}
//         >
//           Submit
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default Modifiers;

