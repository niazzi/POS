import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";

// Icons for each TextField
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";

// Define the roles
const roles = ["Owner","Administrator", "Manager", "Cashier"];
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  role: Yup.string().required("Role is required"),
  pin: Yup.string()
    .matches(/^\d{4}$/, "PIN must be a 4-digit number")
    .required("PIN is required"),
});

const AddEmployee = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      role: null,
      pin: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
    
      console.log("Form submitted with values:", values);
     
    },
  });
  const [showPin, setShowPin] = useState(false);

  const handleTogglePinVisibility = () => {
    setShowPin((prev) => !prev);
  };

  //   useEffect(() => {
  //     formik.setFieldValue("pin", formik.values.pin);
  //   }, [showPin, formik.values.pin]);

  return (
    <form>
      <Paper elevation={3} className="add-employee-paper">
        <Typography variant="h5" gutterBottom className="add-employee-heading">
          Create Employee
        </Typography>

        <Box className="add-employee-form-container">
          <Box className="add-employee-form-field">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
            //   helperText={formik.touched.name && formik.errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
            //   helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            //   helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Autocomplete
              id="role-select"
              options={roles}
              value={formik.values.role}
              onChange={(event, newValue) => {
                formik.setFieldValue("role", newValue);
              }}
              onBlur={() => {
    formik.handleBlur("role");
  }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Role"
                  error={formik.touched.role && Boolean(formik.errors.role)}
                //   helperText={formik.touched.role && formik.errors.role}
                />
              )}
            />

            <TextField
              label="PIN"
              type={showPin ? "text" : "password"}
              value={formik.values.pin}
              onChange={formik.handleChange("pin")}
              onBlur={formik.handleBlur("pin")}
              error={formik.touched.pin && Boolean(formik.errors.pin)}
              // helperText={formik.touched.pin && formik.errors.pin}
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePinVisibility} edge="end">
                      {showPin ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box className="add-employee-submit-button">
          <Button
            variant="contained"
            color="primary"
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default AddEmployee;
