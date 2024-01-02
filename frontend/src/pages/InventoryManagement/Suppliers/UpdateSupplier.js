import React, {useState,useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
//import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Countries } from "../../../components/Countries/Countries";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from '@mui/material/Snackbar';

const UpdateSupplier = ({ onSubmitSuccess }) => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  
  const navigate = useNavigate();
  const { supplierCode } = useParams();
  const prevSupplierCode = useRef(null);

  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };
  // const handleSnackbarClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setSnackbarOpen(false);
  // };

  const handleSupplierDelete = async () => {
    try {
      // Make a DELETE request to your backend API
      await axios.delete(`http://localhost:4000/api/deleteSupplier/${supplierCode}`);
     
      // Redirect to a different page or handle success as needed
      navigate("/supplierlist"); // Redirect to the home page, for example
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting supplier:', error);
      // Handle any errors, show a message, or perform other actions as needed
    } finally {
      // Close the dialog
      setOpenDialogue(false);
    
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string(),
    city: Yup.string(),
    region: Yup.string(),
    postalCode: Yup.string(),
    // country: Yup.object().shape({
    //     code: Yup.string(),
    //     label: Yup.string(),
    //     phone: Yup.string(),
    //     suggested: Yup.boolean(),
    //   }),
    country: Yup.object().nullable(),
    supplierCode: Yup.string()
      .required("Supplier Code is required")
      .test(
        "no-spaces",
        "Supplier code must not contain spaces",
        (value) => !/\s/.test(value)
      ),
    note: Yup.string(),
  });

  const defaultCountry = {
    code: "",
    label: "",
    phone: "",
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
      country: defaultCountry,
      supplierCode: "",
      note: "",
    }, // Keep initial values empty for now
    validationSchema: validationSchema,

    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        // Make a POST request using Axios
        // const response = await axios.post('http://localhost:4000/api/createSupplier', values);

        const response = await axios.put(
          `http://localhost:4000/api/updateSupplier/${supplierCode}`,
          values
        );

        // Handle the response or perform any other actions
        console.log("Response:", response.data);

        // Assuming your API responds with an 'error' field in case of an issue
        if (response.data.error) {
          console.error(response.data.error);

          // Check for specific error messages and set Formik field errors
          const errorMessage = response.data.error.toLowerCase(); // Ensure case-insensitive check
          if (errorMessage.includes("email already exists")) {
            setFieldError("email", "Email already exists");
          }
          if (errorMessage.includes("supplier code already exists")) {
            setFieldError("supplierCode", "Supplier Code already exists");
          }

          // Throw an error to trigger the catch block
          throw new Error(response.data.error);

          // Handle other specific error cases if needed
        } else {
          // Call the onSubmitSuccess callback to close the dialog or perform other actions
          if (onSubmitSuccess && typeof onSubmitSuccess === "function") {
            onSubmitSuccess();
          }

          // Optionally reset the form after successful submission
          resetForm();
          navigate("/supplierlist");
        }
      } catch (error) {
        // Handle AxiosError specifically
        if (axios.isAxiosError(error)) {
          console.error("AxiosError:", error.response?.data); // Log the response data for inspection

          // Check for specific error messages and set Formik field errors
          const errorMessage = error.response?.data.error?.toLowerCase(); // Ensure case-insensitive check
          if (errorMessage?.includes("email already exists")) {
            setFieldError("email", "Email already exists");
          }
          if (errorMessage?.includes("supplier code already exists")) {
            setFieldError("supplierCode", "Supplier Code already exists");
          }
        } else {
          // Handle network errors or unexpected issues
          console.error("Error submitting the form:", error.message);
        }
      }
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/supplier/${supplierCode}`
      );
      const supplierData = response.data;

      formik.setValues(supplierData);
      // Assuming country is a string received from the backend
      const countryOption = Countries.find(
        (option) => option.label === supplierData.country.label
      );

      // Set the initial value of the Autocomplete field based on the fetched country
      formik.setFieldValue("country", countryOption || null);
      prevSupplierCode.current = supplierCode; // Update after a successful call
      console.log("Supplier data", supplierData);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  }, [supplierCode, formik]);

  useEffect(() => {
    if (supplierCode && supplierCode !== prevSupplierCode.current) {
      fetchData();
      prevSupplierCode.current = supplierCode;
    }
  }, [supplierCode, fetchData]);

  // Remove fetchData and supplierCode from the dependencies array

  const handleCancel = () => {
    // Navigate to the supplier list page
    navigate("/supplierlist");
  };

  return (
    <Paper elevation={3} className="supplier-paper">
      <Typography variant="h5" gutterBottom className="supplier-heading">
        Update Supplier
      </Typography>

      <Box className="supplier-form-container">
        <Box className="supplier-form-field">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <AccountCircleIcon color="action" fontSize="small" />
              ),
            }}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name || ""}
            error={formik.touched.name && Boolean(formik.errors.name)}
            //helperText={formik.touched.name && formik.errors.name}
            //onBlur={formik.handleBlur}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <EmailIcon color="action" fontSize="small" />,
            }}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PhoneIcon color="action" fontSize="small" />,
            }}
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            //helperText={formik.touched.phone && formik.errors.phone}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box className="supplier-form-field">
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <LocationOnIcon color="action" fontSize="small" />
              ),
            }}
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            //error={formik.touched.address && Boolean(formik.errors.address)}
            //helperText={formik.touched.address && formik.errors.address}
            //onBlur={formik.handleBlur}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <LocationCityIcon color="action" fontSize="small" />
              ),
            }}
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            //error={formik.touched.city && Boolean(formik.errors.city)}
            //helperText={formik.touched.city && formik.errors.city}
            //onBlur={formik.handleBlur}
          />
          <TextField
            label="Region"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PublicIcon color="action" fontSize="small" />,
            }}
            name="region"
            onChange={formik.handleChange}
            value={formik.values.region}
            //error={formik.touched.region && Boolean(formik.errors.region)}
            //helperText={formik.touched.region && formik.errors.region}
            //onBlur={formik.handleBlur}
          />
        </Box>
        <Box className="supplier-form-field">
          <TextField
            label="Postal Code"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <LocalPostOfficeIcon color="action" fontSize="small" />
              ),
            }}
            name="postalCode"
            onChange={formik.handleChange}
            value={formik.values.postalCode}
            //error={ formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            //helperText={formik.touched.postalCode && formik.errors.postalCode}
            //onBlur={formik.handleBlur}
          />

          <Autocomplete
            id="country-select-demo"
            value={formik.values.country || null}
            defaultValue={defaultCountry}
            onChange={(event, newValue) => {
              console.log("Autocomplete onChange event triggered");
              console.log("Event:", event);
              console.log("New Value:", newValue);

              const selectedOption = Countries.find(
                (option) => option.label === newValue?.label
              );

              // Log the selected value and the found option
              console.log("Selected value:", newValue);
              console.log("Selected option:", selectedOption);

              if (selectedOption) {
                formik.setFieldValue("country", selectedOption);
              } else {
                formik.setFieldValue("country", defaultCountry);
                console.error(
                  "Selected option not found, using default country:",
                  defaultCountry
                );
              }
            }}
            sx={{ width: 300 }}
            options={Countries}
            autoHighlight
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) =>
              option.code === value.code &&
              option.label === value.label &&
              option.phone === value.phone
            }
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  value={
                    formik.values.country ? formik.values.country.label : ""
                  }
                />
              </div>
            )}
          />
          <TextField
            label="Supplier Code"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PersonIcon color="action" fontSize="small" />,
            }}
            name="supplierCode"
            onChange={formik.handleChange}
            value={formik.values.supplierCode}
            error={
              formik.touched.supplierCode && Boolean(formik.errors.supplierCode)
            }
            helperText={
              formik.touched.supplierCode && formik.errors.supplierCode
            }
            onBlur={formik.handleBlur}
          />
        </Box>

        <TextField
          label="Note"
          variant="outlined"
          fullWidth
          multiline
          //   rows={4}
          margin="normal"
          className="supplier-note-field"
          InputProps={{
            startAdornment: <MessageIcon color="action" fontSize="small" />,
          }}
          name="note"
          onChange={formik.handleChange}
          value={formik.values.note}
          // error={formik.touched.note && Boolean(formik.errors.note)}
          // helperText={formik.touched.note && formik.errors.note}
          // onBlur={formik.handleBlur}
        />
      </Box>
      <Box className="supplier-button">
        <Box>
          <Button variant="contained" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Box>

        <Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            <DeleteIcon />
          </Button>
          <Dialog
            open={openDialogue}
            onClose={handleCloseDialogue}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete supplier"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete the supplier?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogue}>Cancel</Button>
              <Button onClick={handleSupplierDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    <Box>
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={60000000}
        //handleClose={handleSnackbarClose}
        message="Supplier deleted successfully"
        severity="success"
      />
    </Box>
    </Paper>
  );
};

export default UpdateSupplier;
