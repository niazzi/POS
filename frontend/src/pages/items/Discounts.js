import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Paper,
  Typography,
  Switch,
  Box,
} from "@mui/material";

const label = { inputProps: { "aria-label": "Switch demo" } };

// const validationSchema = Yup.object().shape({
//   discountName: Yup.string().required("Discount Name is required"),
//   discountType: Yup.string().required("Discount Type is required"),
//   discountValue: Yup.number()
//     .required("Discount Value is required")
//     .positive("Discount Value must be positive"),
//   restrictedAccess: Yup.boolean(),
// });



// const validationSchema = Yup.object({
//   discountName: Yup.string().required("Discount Name is required"),
//   discountType: Yup.string().required("Discount Type is required"),
//   discountValue: Yup.number().required('Discount Value is required')
//     .when(['discountType'], (discountType, schema) => {
//       if (discountType === 'percentage') {
//         return schema.max(100, 'Percentage must be less than or equal to 100');
//       } else {
//         return schema.min(0, 'Amount must be greater than or equal to 0');
//         // Add any other conditions and validations as needed
//       }
//     }),
//   restrictedAccess: Yup.boolean(),
// });

// const validationSchema = Yup.object({
//   discountName: Yup.string().required('Discount Name is required'),
//   discountType: Yup.string().required('Discount Type is required'),
//   discountValue: Yup.number().required('Discount Value is required')
//     .test('maxValue', 'Invalid value', (value, { parent }) => {
//       if (parent.discountType === 'percentage') {
//         return value <= 100;
//       } else {
//         return value >= 0;
//       }
//     }),
//   restrictedAccess: Yup.boolean(),
// });


const validationSchema = Yup.object({
  discountName: Yup.string().required('Discount Name is required'),
  discountType: Yup.string().required('Discount Type is required'),
  discountValue: Yup.number()
    .required('Discount Value is required')
    .test('maxValue', 'Invalid value', (value, { parent }) => {
      if (parent.discountType === 'percentage') {
        return value >= 0 && value <= 100;
      } else {
        return value >= 0 && value <= 999999;
      }
    })
    .test('minValue', 'Invalid value', (value, { parent }) => {
      return parent.discountType === 'percentage' ? value >= 0 : true;
    }),
  restrictedAccess: Yup.boolean(),
});


// const validationSchema = Yup.object({
//   discountName: Yup.string().required('Discount Name is required'),
//   discountType: Yup.string().required('Discount Type is required'),
//   discountValue: Yup.number()
//     .when(['discountType'], {
//       is: 'percentage',
//       then: Yup.number().max(100, 'Percentage must be less than or equal to 100'),
//     })
//     .when(['discountType'], {
//       is: 'amount',
//       then: Yup.number().positive('Discount Value must be positive').max(99999, 'Amount must be less than or equal to 99999'),
//     })
//     .required('Discount Value is required'),
//   restrictedAccess: Yup.boolean(),
// });


// const validationSchema = Yup.object({
//   discountName: Yup.string().required('Discount Name is required'),
//   discountType: Yup.string().required('Discount Type is required'),
//   discountValue: Yup.number().required('Discount Value is required'),
//   restrictedAccess: Yup.boolean(),
// }).when('discountType', {
//   is: 'percentage',
//   then: Yup.object({
//     discountValue: Yup.number().max(100, 'Percentage must be less than or equal to 100'),
//   }),
//   otherwise: Yup.object({
//     discountValue: Yup.number().positive('Discount Value must be positive'),
//   }),
// });






// const SwitchField = ({ label, ...props }) => {
//   const [field] = useField(props);
//   return <Switch {...field} {...props} />;
// };

const Discounts = () => {
  const formik = useFormik({
    initialValues: {
      discountName: "",
      discountType: "percentage",
      discountValue: "",
      restrictedAccess: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form values:", values);
    },
  });

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom>
        Create Discount
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Discount Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="discountName"
          value={formik.values.discountName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          error={
            formik.touched.discountName && Boolean(formik.errors.discountName)
          }
         // helperText={formik.touched.discountName && formik.errors.discountName}
        />

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Discount Type</FormLabel>
          <RadioGroup
            row
            aria-label="discount-type"
            name="discountType"
            value={formik.values.discountType}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="percentage"
              control={<Radio />}
              label="Percentage"
            />
            <FormControlLabel
              value="amount"
              control={<Radio />}
              label="Amount"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label={`Discount ${
            formik.values.discountType === "percentage"
              ? "Percentage"
              : "Amount"
          }`}
          variant="outlined"
          fullWidth
          margin="normal"
          type={formik.values.discountType === "percentage" ? "number" : "text"}
          name="discountValue"
          value={formik.values.discountValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          error={
            formik.touched.discountValue && Boolean(formik.errors.discountValue)
          }
          helperText={
            formik.touched.discountValue && formik.errors.discountValue
          }
        />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={2}
        >
          <Typography variant="" gutterBottom>
            Restricted access. Only employees with appropriate access rights are
            able to apply this discount.
          </Typography>
          <Switch
            name="restrictedAccess"
            {...label}
            checked={formik.values.restrictedAccess}
            onChange={formik.handleChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "20%", marginLeft: "35%", marginTop: "16px" }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default Discounts;
