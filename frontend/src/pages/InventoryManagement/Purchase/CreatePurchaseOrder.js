import React, { useState, useEffect } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import {
  Paper,
  Typography,
  // Card,
  // CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MuiTextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Autocomplete, TextField } from "formik-mui";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { object, string, mixed, array, number } from "yup";

const CreatePurchaseOrder = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [purchaseOrderDate, setPurchaseOrderDate] = useState(dayjs());
  const [showRows, setShowRows] = useState(false);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    // Fetch supplier data from the backend API
    axios
      .get("http://localhost:4000/api/suppliers")
      .then((response) => {
        setSupplierData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching supplier data:", error);
      });
    axios
      .get("http://localhost:4000/api/stores")
      .then((response) => {
        setStoreData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
  }, []);
  const TotalAmountCalculator = ({ values, setFieldValue }) => {
    useEffect(() => {
      const totalAmount =
        values.items.reduce(
          (total, item) => total + item.itemQuantity * item.purchaseCost,
          0
        ) +
        values.additionalCosts.reduce(
          (total, cost) => total + parseFloat(cost.amount || 0),
          0
        );

      setFieldValue("totalAmount", totalAmount);
    }, [values.items, values.additionalCosts, setFieldValue]);

    return null; // This component doesn't render anything
  };
  return (
    <Formik
      initialValues={{
        supplierInfo: null,
        storeInfo: null,
        purchaseOrderDate: purchaseOrderDate.toDate(),
        expectedOrderDate: null,
        note: "",
        items: [], // This will hold the selected items
        additionalCosts: [{ name: "", amount: "" }],
        totalAmount: 0,
      }}
      validationSchema={object({
        supplierInfo: object()
          .shape({
            name: string().required("Supplier name is required"),
            supplierCode: string().required("Supplier code is required"),
          })
          .nullable()
          .required("Supplier is required"),

        storeInfo: object()
          .shape({
            name: string().required("Store name is required"),
            storeCode: string().required("Store code is required"),
          })
          .nullable()
          .required("Store is required"),
        // purchaseOrderDate: mixed()
        // .nullable()
        // .test({
        //   name: "isValidDate",
        //   test: function (value) {
        //     //console.log('Input value:', value);

        //     // If the value is null or undefined, it's considered valid
        //     if (value == null) {
        //       //console.log('Value is null or undefined, considered valid');
        //       return true;
        //     }

        //     // Check if the value is a valid date
        //     const isValidDate = dayjs(value).isValid();
        //     //console.log('Is valid date:', isValidDate);

        //     // Allow dates in the range of 1900 to 2099
        //     const isInRange = dayjs(value).isBetween(
        //       dayjs("1900-01-01"),
        //       dayjs("2099-12-31"),
        //       null,
        //       "[]"
        //     );
        //     //console.log('Is in range:', isInRange);

        //     const result = isValidDate && isInRange;
        //     //console.log('Validation result:', result);

        //     return result;
        //   },
        //   message:
        //     "Invalid date format, date out of range (1900-2099), or future date for Purchase Order Date",
        // }) .required('Purchase Order Date is required'),
        purchaseOrderDate: mixed()
          .nullable()
          .test({
            name: "isValidDate",
            test: function (value) {
              // If the value is null or undefined, it's considered valid
              // if (value == null) {
              //   return true;
              // }
              if (value == null) {
                throw this.createError({
                  message: "Purchase Order Date is required",
                });
              }

              // Check if the value is a valid date
              const isValidDate = dayjs(value).isValid();

              // Allow dates in the range of 1900 to 2099
              const isInRange = dayjs(value).isBetween(
                dayjs("1900-01-01"),
                dayjs("2099-12-31"),
                null,
                "[]"
              );

              // Check each condition separately and throw specific error messages
              if (!isValidDate) {
                throw this.createError({
                  message: "Invalid date format for Purchase Order Date",
                });
              }

              if (!isInRange) {
                throw this.createError({
                  message:
                    "Date out of range (1900-2099) for Purchase Order Date",
                });
              }

              return true;
            },
          })
          .required("Purchase Order Date is required"),
        //expectedOrderDate: mixed().nullable().notRequired(),
        expectedOrderDate: mixed()
          .nullable()
          .test({
            name: "isValidDate",
            test: function (value) {
              // If the value is null or undefined, it's considered valid
              if (value == null) {
                return true;
              }

              // Check if the value is a valid date
              const isValidDate = dayjs(value).isValid();

              // Allow dates in the range of 1900 to 2099
              const isInRange = dayjs(value).isBetween(
                dayjs("1900-01-01"),
                dayjs("2099-12-31"),
                null,
                "[]"
              );

              // Check each condition separately and throw specific error messages
              if (!isValidDate) {
                throw this.createError({
                  message: "Invalid date format for Purchase Order Date",
                });
              }

              if (!isInRange) {
                throw this.createError({
                  message:
                    "Date out of range (1900-2099) for Purchase Order Date",
                });
              }

              return true;
            },
          }),
        note: string().notRequired(),
        //       items: array().of(
        //   object().shape({
        //     itemQuantity: number().required('Item Quantity is required'),
        //     purchaseCost: number().required('Purchase Cost is required'),
        //     // Add other validations as needed
        //   })
        // )
        // items: array()
        //   .of(
        //     object().shape({
        //       itemQuantity: number().required("Item Quantity is required"),
        //       purchaseCost: number().required("Purchase Cost is required"),
        //       // Add other validations as needed
        //     })
        //   )
        //   .min(1, "At least one item must be selected")
        //   .required("At least one item must be selected"), // Add this line to check if the array is not empty
        items: array()
          .of(
            object().shape({
              itemQuantity: number().required("Item Quantity is required"),
              purchaseCost: number().required("Purchase Cost is required"),
              // Add other validations as needed
            })
          )
          .test(
            "atLeastOneItem",
            "At least one item must be selected",
            function (value) {
              return value && value.length >= 1;
            }
          ),
          additionalCosts: showRows
      ? array().of(
          object().shape({
            name: string().required("Name is required"),
            amount: number()
              .required("Amount is required")
              .positive("Amount must be a positive number"),
          })
        )
      : array(),
      })}
      onSubmit={async (values) => {
        console.log("My Form Values", values);
        return new Promise((res) => setTimeout(res, 2500));
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }) => (
        <Form autoComplete="off">
          <Paper elevation={3} className="create-purchase-order-paper1">
            <Typography
              variant="h5"
              gutterBottom
              className="create-purchase-order-heading"
            >
              Create Purchase Order
            </Typography>
            <Box className="create-purchase-order-form-container">
              <Box className="create-purchase-order-form-field">
                <Field
                  name="supplierInfo"
                  component={Autocomplete}
                  options={supplierData}
                  //getOptionLabel={(option) => option.title}
                  getOptionLabel={(option) =>
                    `${option.name} - ${option.supplierCode}`
                  }
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      // We have to manually set the corresponding fields on the input component
                      name="supplierInfo"
                      error={
                        touched["supplierInfo"] && !!errors["supplierInfo"]
                      }
                      helperText={errors["supplierInfo"]}
                      label="Supplier"
                      variant="outlined"
                    />
                  )}
                />
                <Field
                  name="storeInfo"
                  component={Autocomplete}
                  options={storeData}
                  getOptionLabel={(option) =>
                    `${option.name} - ${option.storeCode}`
                  }
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      // We have to manually set the corresponding fields on the input component
                      name="storeInfo"
                      error={touched["storeInfo"] && !!errors["storeInfo"]}
                      helperText={errors["storeInfo"]}
                      label="Store"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
              <Box className="create-purchase-order-form-field">
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                  <div className="create-purchase-order-customDatePickerContainer">
                    <DemoContainer components={["DatePicker"]}>
                      <DesktopDatePicker
                        label="Purchase Order Date"
                        name="purchaseOrderDate"
                        value={purchaseOrderDate}
                        onChange={(date) => {
                          setFieldValue("purchaseOrderDate", date);
                          setPurchaseOrderDate(dayjs(date)); // Update controlled state
                        }}
                        className="create-purchase-order-customDatePicker"
                      />
                    </DemoContainer>
                    <ErrorMessage
                      name="purchaseOrderDate"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="create-purchase-order-customDatePickerContainer">
                    <DemoContainer components={["DatePicker"]}>
                      <DesktopDatePicker
                        label="Expected Order Date"
                        name="expectedOrderDate"
                        value={values.expectedOrderDate}
                        onChange={(date) =>
                          setFieldValue("expectedOrderDate", date)
                        }
                        className="create-purchase-order-customDatePicker"
                      />
                    </DemoContainer>
                    <ErrorMessage
                      name="expectedOrderDate"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </LocalizationProvider>
              </Box>
              <Box className="create-purchase-order-form-field">
                <Field
                  name="note"
                  component={TextField}
                  label="Note"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  className="customer-note-field"
                />
              </Box>
            </Box>
          </Paper>
          <Paper elevation={3} className="create-purchase-order-paper2">
            <Box className="create-purchase-order-ItemDetail-heading">
              <Typography variant="h5" gutterBottom>
                Items
              </Typography>
              <Box>
                <Button
                  component="label"
                  size="large"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  IMPORT
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Button size="large" variant="contained">
                  AUTOFILL
                </Button>
              </Box>
            </Box>
            <Box className="create-purchase-order-itemDetail-form">
              <FieldArray name="items">
                {({ push, remove }) => (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Code</TableCell>
                          <TableCell>Item Name</TableCell>
                          <TableCell align="right">Incoming Item</TableCell>
                          <TableCell align="right">In Stock Item</TableCell>
                          <TableCell align="right">Item Quantity</TableCell>
                          <TableCell align="right">Purchase Cost</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {values.items.map((item, index) => {
                          const amount = item.itemQuantity * item.purchaseCost;
                          // Update form state with the calculated amount
                          //setFieldValue(`items.${index}.amount`, amount);
                          return (
                            <TableRow key={index}>
                              <TableCell>{item.itemCode}</TableCell>
                              <TableCell>{item.itemName}</TableCell>
                              <TableCell align="right">
                                {item.incomingItem}
                              </TableCell>
                              <TableCell align="right">
                                {item.inStockItem}
                              </TableCell>
                              {/* Input field for Item Quantity */}
                              <TableCell align="right">
                                <Field
                                  name={`items.${index}.itemQuantity`}
                                  component={TextField}
                                  variant="standard"
                                  type="number"
                                  fullWidth
                                  //value={item.itemQuantity}
                                  //initialValue={0}
                                  onChange={(event) => {
                                    // Update form state with the new itemQuantity
                                    setFieldValue(
                                      `items.${index}.itemQuantity`,
                                      event.target.value
                                    );
                                    // Recalculate and update the amount
                                    setFieldValue(
                                      `items.${index}.amount`,
                                      event.target.value * item.purchaseCost
                                    );
                                  }}
                                />
                              </TableCell>
                              {/* Input field for Purchase Cost */}
                              <TableCell align="right">
                                <Field
                                  name={`items.${index}.purchaseCost`}
                                  component={TextField}
                                  variant="standard"
                                  type="number"
                                  fullWidth
                                  onChange={(event) => {
                                    // Update form state with the new purchaseCost
                                    setFieldValue(
                                      `items.${index}.purchaseCost`,
                                      event.target.value
                                    );
                                    // Recalculate and update the amount
                                    setFieldValue(
                                      `items.${index}.amount`,
                                      event.target.value * item.itemQuantity
                                    );
                                  }}
                                />
                              </TableCell>
                              <TableCell>{amount}</TableCell>
                              <TableCell align="right">
                              <IconButton disabled={isSubmitting} onClick={() => remove(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </FieldArray>
              {/* <ErrorMessage name="items" component="div" className="error" /> */}
              {/* Autocomplete for selecting items */}
              <div>
                <Field
                  name="itemName"
                  component={Autocomplete}
                  freeSolo
                  options={itemData}
                  style={{ width: 300 }}
                  getOptionLabel={(option) =>
                    `${option.itemCode} - ${option.itemName}`
                  }
                  // onChange={(event, value) => {
                  //   const newItem = {
                  //     ...value,
                  //     itemQuantity: "",
                  //     purchaseCost: "",
                  //     amount: "",
                  //   };

                  //   setFieldValue("items", [...values.items, newItem]);
                  //   //setFieldValue("itemName", ""); // Set itemName to an empty string
                  // }}
                  onChange={(event, value) => {
                    const newItem = {
                      ...value,
                      itemQuantity: "",
                      purchaseCost: "",
                      amount: "",
                    };

                    if (!value) {
                      // No item selected, set an error
                      setFieldError("itemName", "Select at least one item");
                    } else {
                      // Item selected, clear the error
                      setFieldError("itemName", "");
                    }

                    setFieldValue("items", [...values.items, newItem]);
                  }}
                  value={null} // Ensure that the value is set to null initially
                  clearOnBlur={true} // Set clearOnBlur to true
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      name="itemName"
                      value={values.itemName}
                      error={touched["itemName"] && !!errors["itemName"]}
                      helperText={errors["itemName"]}
                      label="Search Item"
                      variant="outlined"
                    />
                  )}
                />

                <ErrorMessage name="items">
                  {(error) => (
                    <Typography variant="body2" color="error">
                      {error
                        ? // If there is an error, show it
                          typeof error === "string"
                          ? error
                          : ""
                        : // If no error, check the length of the items array
                        values.items && values.items.length >= 1
                        ? // If at least one item is selected, don't show the error
                          null
                        : // If no item is selected, or if quantity and cost are not entered, show the error
                          "At least one item must be selected"}
                          </Typography>
                  )}
                </ErrorMessage>
           

                {/* <ErrorMessage name="items" component="div" className="error" /> */}
              </div>

              {/* Your table setup here */}

              <TableContainer>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Additional Cost</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <FieldArray name="additionalCosts">
                    {({ push, remove }) => (
                      <TableBody>
                        {!showRows && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                className="addAdditionalCost"
                                onClick={() => setShowRows(true)}
                              >
                                <AddIcon /> Add Additional Cost
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                        {showRows &&
                          values.additionalCosts.map((cost, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Field
                                  name={`additionalCosts.${index}.name`}
                                  component={TextField}
                                  variant="standard"
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Field
                                  name={`additionalCosts.${index}.amount`}
                                  component={TextField}
                                  variant="standard"
                                  type="number"
                                />
                              </TableCell>
                              <TableCell padding="none" align="right">
                                <IconButton disabled={isSubmitting} onClick={() => remove(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        {showRows && (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Button
                                type="button"
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                className="addAdditionalCost"
                                onClick={() => push({ name: "", amount: "" })}
                              >
                                <AddIcon /> Add Additional Cost
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    )}
                  </FieldArray>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table aria-label="spanning table">
                  <TableBody>
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />
                      <TableCell rowSpan={3} />

                      <TableCell align="right">Total</TableCell>
                      {/* <TableCell align="right">
                        {values.items.reduce(
                          (total, item) =>
                            total + item.itemQuantity * item.purchaseCost,
                          0
                        ) +
                          values.additionalCosts.reduce(
                            (total, cost) =>
                              total + parseFloat(cost.amount || 0),
                            0
                          )}
                      </TableCell> */}

                      <TableCell align="right">
                        {/* Use the TotalAmountCalculator component */}
                        <TotalAmountCalculator
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                        {/* Display the calculated total amount */}
                        {values.totalAmount}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Button setup here */}

              {/* <Button
          type="button"
          variant="contained"
          color="primary"
          className="addAdditionalCost"
          onClick={() => push({ name: '', amount: '' })}
        >
          <AddIcon /> Add Additional Cost
        </Button> */}
            </Box>
          </Paper>
          <Box style={{ textAlign: "right", marginTop: "10px" }}>
            {" "}
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              align="right"
              // startIcon={isSubmitting ? <CircularProgress size="0.9rem/> :undefined}
              startIcon={
                isSubmitting ? <CircularProgress size="0.9rem" /> : undefined
              }
            >
              {isSubmitting ? "Creating" : "Create"}
            </Button>
          </Box>
          <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePurchaseOrder;

const itemData = [
  {
    itemCode: "001",
    itemName: "Item 1",
    incomingItem: "Incoming Item 1",
    inStockItem: "In Stock Item 1",
    itemQuantity: 10,
    purchaseCost: 5.99,
  },
  {
    itemCode: "111",
    itemName: "Item 1",
    incomingItem: "Incoming Item 1",
    inStockItem: "In Stock Item 1",
    itemQuantity: 10,
    purchaseCost: 5.99,
  },
  {
    itemCode: "112",
    itemName: "Item 1",
    incomingItem: "Incoming Item 1",
    inStockItem: "In Stock Item 1",
    itemQuantity: 10,
    purchaseCost: 5.99,
  },
  {
    itemCode: "002",
    itemName: "Item 2",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "003",
    itemName: "Item 3",
    incomingItem: "Incoming Item 3",
    inStockItem: "In Stock Item 3",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "004",
    itemName: "Item 4",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "005",
    itemName: "Item 5",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "006",
    itemName: "Item 6",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "007",
    itemName: "Item 7",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "008",
    itemName: "Item 8",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "009",
    itemName: "Item 9",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "010",
    itemName: "Item 10",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "011",
    itemName: "Item 11",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "012",
    itemName: "Item 12",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "013",
    itemName: "Item 13",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "014",
    itemName: "Item 14",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "015",
    itemName: "Item 15",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "016",
    itemName: "Item 16",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "017",
    itemName: "Item 17",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "018",
    itemName: "Item 18",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "019",
    itemName: "Item 19",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "020",
    itemName: "Item 20",
    incomingItem: "Incoming Item 2",
    inStockItem: "In Stock Item 2",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "021",
    itemName: "Item 21",
    incomingItem: "Incoming Item 21",
    inStockItem: "In Stock Item 21",
    itemQuantity: 21,
    purchaseCost: 8.99,
  },
  {
    itemCode: "022",
    itemName: "Item 22",
    incomingItem: "Incoming Item 22",
    inStockItem: "In Stock Item 22",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "023",
    itemName: "Item 23",
    incomingItem: "Incoming Item 23",
    inStockItem: "In Stock Item 23",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "024",
    itemName: "Item 24",
    incomingItem: "Incoming Item 24",
    inStockItem: "In Stock Item 24",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  {
    itemCode: "025",
    itemName: "Item 25",
    incomingItem: "Incoming Item 25",
    inStockItem: "In Stock Item 25",
    itemQuantity: 20,
    purchaseCost: 8.99,
  },
  // Add more items as needed
];
