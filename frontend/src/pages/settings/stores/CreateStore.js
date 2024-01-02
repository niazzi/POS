import React from "react";
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

const CreateStore = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();
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
    storeCode: Yup.string()
      .required("Store Code is required")
      .test(
        "no-spaces",
        "Store code must not contain spaces",
        (value) => !/\s/.test(value)
      ),
      description: Yup.string(),
  });
  // const defaultCountry = {
  //   code: "default",
  //   label: "Default Country",
  //   phone: "+1",
  // };
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
      storeCode: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        console.log(values);
        if (!formik.touched.country) {
          // Set country to the default values
          formik.setFieldValue("country", defaultCountry);
          console.log(
            "Country not touched, setting to default values:",
            defaultCountry
          );
        }
        const response = await axios.post(
          "http://localhost:4000/api/createstore",
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
          if (errorMessage.includes("store code already exists")) {
            setFieldError("storeCode", "Store Code already exists");
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
          navigate("/dashboard/settings");
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
          if (errorMessage?.includes("store code already exists")) {
            setFieldError("storeCode", "Store Code already exists");
          }
        } else {
          // Handle network errors or unexpected issues
          console.error("Error submitting the form:", error.message);
        }
      }
    },
  });

  const handleCancel = () => {
    // Navigate to the supplier list page
    navigate("/dashboard/settings");
  };

  return (
    <Paper elevation={3} className="supplier-paper">
      <Typography variant="h5" gutterBottom className="supplier-heading">
        Create Store
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
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            //helperText={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
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
            defaultValue={defaultCountry} // Set the default value
            onChange={(event, newValue) => {
              console.log("Autocomplete onChange event triggered");
              console.log("Event:", event);
              console.log("New Value:", newValue);

              // Check if a country is selected
              if (newValue) {
                const selectedOption = Countries.find(
                  (option) => option.label === newValue?.label || ""
                );

                // Log the selected value and the found option
                console.log("Selected value:", newValue);
                console.log("Selected option:", selectedOption);

                if (selectedOption) {
                  // Set the selected country
                  formik.setFieldValue("country", selectedOption);
                  console.log("Selected option found:", selectedOption);
                } else {
                  console.error("Selected option not found:", newValue);
                  // Handle the case when the selected option is not found (optional)
                }
              } 
              else {
                // If no country is selected, set the default country
                formik.setFieldValue("country", defaultCountry);
                console.log("Setting default country:", defaultCountry);
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
            label="Store Code"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: <PersonIcon color="action" fontSize="small" />,
            }}
            name="storeCode"
            onChange={formik.handleChange}
            value={formik.values.storeCode}
            error={formik.touched.storeCode && Boolean(formik.errors.storeCode)}
            helperText={formik.touched.storeCode && formik.errors.storeCode}
            onBlur={formik.handleBlur}
          />
        </Box>

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          //   rows={4}
          margin="normal"
          className="supplier-note-field"
          InputProps={{
            startAdornment: <MessageIcon color="action" fontSize="small" />,
          }}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          // error={formik.touched.description && Boolean(formik.errors.description)}
          // helperText={formik.touched.description && formik.errors.description}
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
      </Box>
    </Paper>
  );
};

export default CreateStore;
