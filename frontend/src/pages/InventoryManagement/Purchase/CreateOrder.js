import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

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
//const TAX_RATE = 0.07;

const CreatePurchaseOrder = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [itemData, setItemData] = useState([]);
  //const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  //const [additionalCosts, setAdditionalCosts] = useState([]);
  const validationSchema = Yup.object().shape({
    selectedSupplierCode: Yup.string().required("Supplier is required"),
    selectedStoreCode: Yup.string().required("Store is required"),
    selectedItems: Yup.array()
    .min(1, 'Please add at least one item to the purchase order')
    .of(
      Yup.object().shape({
        quantity: Yup.number()
        .default(0)  // Set default value for quantity to 0
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1')
          .typeError('Quantity must be a number'),
        cost: Yup.number()
        .default(0)  // Set default value for cost to 0
          .required('Cost is required')
          .min(1, 'Cost must be at least 1')
          .typeError('Cost must be a number'),
      })
    ),
    // Add more validations for other fields if needed
  });
  const formik = useFormik({
    initialValues: {
      selectedSupplierCode: null,
      selectedStoreCode: null,
      purchaseOrderDate: null,
      expectedDate: null,
      note: "",
      totalAmount: 0, // Add a new field for total amount
      // selectedItems: [
      //   { quantity: 0, cost: 0 },
      //   // ... other items
      // ],
      selectedItems: [],
      additionalCosts: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const totalAmount = calculateTotalAmount(values.selectedItems);
      console.log("All values of Form", values);
      console.log(
        `Selected Supplier Code: ${values.selectedSupplierCode}, Selected Store Code: ${values.selectedStoreCode}, Purchase Order Date: ${values.purchaseOrderDate}, Expected Date: ${values.expectedDate}`
      );
      console.log("Selected Supplier Code:", values.selectedSupplierCode);
      console.log("Selected Store Code:", values.selectedStoreCode);
      console.log("Purchase Order Date:", values.purchaseOrderDate);
      console.log("Expected Date:", values.expectedDate);
      console.log(`Note: ${values.note}`);
      console.log("Selected Items:", values.selectedItems);
      console.log("Additional Costs:", values.additionalCosts);
      console.log("Total Amount:", totalAmount);
      // You can now send the selected codes to your backend or perform other actions.
    },
  });

  const handleAddCost = () => {
    // setAdditionalCosts([...additionalCosts, { cost: "", amount: "" }]);

    formik.setFieldValue("additionalCosts", [
      ...formik.values.additionalCosts,
      { cost: "", amount: "" },
    ]);
  };

  const handleDeleteCost = (index) => {
    const updatedCosts = [...formik.values.additionalCosts];
    updatedCosts.splice(index, 1);
    formik.setFieldValue("additionalCosts", updatedCosts);
  };

  const handleItemChange = (event, value) => {
    if (value) {
      const quantity = value.quantity || 0;
      const cost = value.cost || 0;
      const amount = quantity * cost;

      const updatedItem = { ...value, quantity, cost, amount };
      const updatedItems = [...formik.values.selectedItems, updatedItem];
    

  
      formik.setFieldValue("selectedItems", updatedItems);
      setSelectedItemCode("");
       // Check if formik and its method handleBlur are defined before calling
 
    }
  };

  const handleQuantityChange = (event, index) => {
    const quantity = parseInt(event.target.value) || 0;
    const cost = formik.values.selectedItems[index].cost || 0;
    const amount = quantity * cost;
  
    const updatedItems = formik.values.selectedItems.map((item, i) =>
      i === index ? { ...item, quantity, amount } : item
    );
  
    formik.setFieldValue("selectedItems", updatedItems);
  
    // Conditionally manipulate the formik state based on your criteria
    if (quantity <= 1) {
      // Set an error message if the condition is not met
      formik.setFieldError(
        `selectedItems[${index}].quantity`,
        'Quantity must be greater than 1'
      );
    } else {
      // Clear the error if the condition is met
      formik.setFieldError(`selectedItems[${index}].quantity`, undefined);
    }
  
    // Set the touched state for the quantity field to false
    formik.setFieldTouched(`selectedItems[${index}].quantity`, false);
  };
  

  const handleCostChange = (event, index) => {
    const cost = parseFloat(event.target.value) || 0;
    const quantity = formik.values.selectedItems[index].quantity || 0;
    const amount = quantity * cost;

    const updatedItems = formik.values.selectedItems.map((item, i) =>
      i === index ? { ...item, cost, amount } : item
    );

    formik.setFieldValue("selectedItems", updatedItems);
    formik.setFieldError(`selectedItems[${index}].cost`, undefined);
  };

  const calculateTotalAmount = () => {
    // Calculate the total amount of selected items
    const selectedItemsTotal = formik.values.selectedItems.reduce(
      (total, item) => total + item.amount,
      0
    );

    // Calculate the total amount of additional costs
    const additionalCostsTotal = formik.values.additionalCosts.reduce(
      (total, cost) => total + parseFloat(cost.amount || 0),
      0
    );

    // Calculate the overall total amount (selected items + additional costs)
    const totalAmount = selectedItemsTotal + additionalCostsTotal;

    return totalAmount;
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...formik.values.selectedItems];
    updatedItems.splice(index, 1);
    formik.setFieldValue("selectedItems", updatedItems);
  };

  //const currentDate = new Date();
  const renderOption = (props, option) => (
    <li {...props} key={option.itemCode}>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>{option.itemCode}</TableCell>
              <TableCell>{option.itemName}</TableCell>
              <TableCell>{option.incomingItem}</TableCell>
              <TableCell>{option.minStockQty}</TableCell>
              {/* <TableCell>{option.itemQuantity}</TableCell>
              <TableCell>{option.purchaseCost}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </li>
  );
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
    // Fetch store data from the backend API
    axios
      .get("http://localhost:4000/api/stores")
      .then((response) => {
        setStoreData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching store data:", error);
      });
    // Fetch item data from the backend API when the component mounts
    // axios
    //   .get("http://localhost:4000/api/items")
    //   .then((response) => {
    //     setItemData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching item data:", error);
    //   });
    axios
      .get("http://localhost:4000/api/items")
      .then((response) => {
        // Extract only the required fields from each item
        const simplifiedData = response.data.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          incomingStock: item.incomingStock,
          minStockQty: item.minStockQty,
        }));

        // Set the simplified data in your component state
        setItemData(simplifiedData);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // const handleSupplierChange = (event, value) => {
  //   // 'value' will be the selected supplier object
  //   setSelectedSupplier(value);
  // };
  const handleSupplierChange = (event, value) => {
    formik.setFieldValue("selectedSupplierCode", value?.supplierCode || null);
    formik.setFieldError("selectedSupplierCode", "");
  };
  const handleStoreChange = (event, value) => {
    formik.setFieldValue("selectedStoreCode", value?.storeCode || null);
    formik.setFieldError("selectedStoreCode", ""); // Clear the error on change
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={supplierData}
                getOptionLabel={(option) =>
                  `${option.name} - ${option.supplierCode}`
                } // Combine code and name
                onChange={handleSupplierChange}
                onBlur={() => {
    formik.handleBlur({ target: { name: 'selectedSupplierCode' } });  
    formik.setFieldTouched('selectedSupplierCode', true);  
  }}
                sx={{ width: 300 }}
                //onChange={handleSupplierChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier Name & Code"
                    error={
                      formik.touched.selectedSupplierCode &&
                      Boolean(formik.errors.selectedSupplierCode)
                    }
                    helperText={
                      formik.touched.selectedSupplierCode &&
                      formik.errors.selectedSupplierCode
                    }
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="store-autocomplete"
                options={storeData}
                getOptionLabel={(option) =>
                  `${option.name} - ${option.storeCode}`
                }
                sx={{ width: 300 }}
                onChange={handleStoreChange}
                onBlur={() => {
    formik.handleBlur({ target: { name: 'selectedStoreCode' } });  // Manually trigger onBlur
    formik.setFieldTouched('selectedStoreCode', true);  // Manually set field as touched
  }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Store Name & Code"
                    error={
                      formik.touched.selectedStoreCode &&
                      Boolean(formik.errors.selectedStoreCode)
                    }
                    helperText={
                      formik.touched.selectedStoreCode &&
                      formik.errors.selectedStoreCode
                    }
                  />
                )}
              />
            </Box>
            <Box className="create-purchase-order-form-field">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="create-purchase-order-customDatePickerContainer">
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Purchase Order Date"
                      value={formik.values.purchaseOrderDate}
                      onChange={(date) =>
                        formik.setFieldValue("purchaseOrderDate", date)
                      }
                      className="create-purchase-order-customDatePicker"
                    />
                  </DemoContainer>
                </div>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="create-purchase-order-customDatePickerContainer">
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Expected Date"
                      value={formik.values.expectedDate}
                      onChange={(date) =>
                        formik.setFieldValue("expectedDate", date)
                      }
                      className="create-purchase-order-customDatePicker"
                    />
                  </DemoContainer>
                </div>
              </LocalizationProvider>
            </Box>
            <Box className="create-purchase-order-form-field">
              <TextField
                label="Note"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                margin="normal"
                className="customer-note-field"
                {...formik.getFieldProps("note")} // Use getFieldProps to bind the input to Formik
              />
            </Box>

            {/* <TextField
          label="Note"
          variant="outlined"
          fullWidth
          multiline
          //   rows={4}
          margin="normal"
          className="customer-note-field"
        /> */}
          </Box>
          <Box className="customer-submit-button">
            {/* <Button variant="contained" color="primary">
          Submit
        </Button> */}
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
            {/* Render Autocomplete fields for each row */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1100 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Code</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="right">Incoming Item</TableCell>
                    <TableCell align="right">In Stock Item</TableCell>
                    <TableCell align="right">Item Quantity</TableCell>
                    <TableCell align="right">Purchase Cost</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formik.values.selectedItems.map((selectedItem, index) => (
                    <TableRow key={index}>
                      <TableCell padding="none">
                        {selectedItem.itemCode}
                      </TableCell>
                      <TableCell padding="none">
                        {selectedItem.itemName}
                      </TableCell>
                      <TableCell align="right" padding="none">
                        {selectedItem.incomingItem !== undefined
                          ? selectedItem.incomingItem
                          : ""}
                      </TableCell>

                      <TableCell align="right" padding="none">
                        {selectedItem.minStockQty}
                      </TableCell>
                      {/* <TableCell align="right" padding="none">{selectedItem.itemQuantity}</TableCell>
          <TableCell align="right" padding="none">{selectedItem.purchaseCost}</TableCell> */}
                      <TableCell align="right" padding="none">
                        {" "}
                        {/* <TextField
                          type="number"
                          variant="standard"
                          {...formik.getFieldProps(
                            `selectedItems[${index}].quantity`
                          )}
                          onChange={(e) => handleQuantityChange(e, index)}
                          onBlur={() => {
    formik.handleBlur({
      target: { name: `selectedItems[${index}].quantity` },
    });
  }}
                          helperText={
      formik.touched.selectedItems &&
      formik.errors.selectedItems &&
      formik.errors.selectedItems[index] &&
      formik.errors.selectedItems[index].quantity
        ? formik.errors.selectedItems[index].quantity
        : ''
    }
    error={
      formik.touched.selectedItems &&
      Boolean(formik.errors.selectedItems) &&
      Boolean(formik.errors.selectedItems[index]?.quantity)
    }
     value={formik.values.selectedItems[index].quantity || ''}
    
                        /> */}
                        <TextField
  type="number"
  variant="standard"
  {...formik.getFieldProps(`selectedItems[${index}].quantity`)}
  onChange={(e) => {
    handleQuantityChange(e, index);
    // Check for errors during the change event
    formik.setFieldTouched(`selectedItems[${index}].quantity`, true);
  }}
  onBlur={() => {
    formik.handleBlur({
      target: { name: `selectedItems[${index}].quantity` },
    });
    formik.setFieldTouched(`selectedItems[${index}].cost`, false);
  }}
  helperText={
    (formik.touched.selectedItems &&
      formik.errors.selectedItems &&
      formik.errors.selectedItems[index] &&
      formik.touched.selectedItems[index] &&
      formik.errors.selectedItems[index].quantity) ||
    ''
  }
  error={
    (formik.touched.selectedItems &&
      formik.errors.selectedItems &&
      formik.errors.selectedItems[index] &&
      formik.touched.selectedItems[index] &&
      Boolean(formik.errors.selectedItems[index]?.quantity)) ||
    false
  }
  value={formik.values.selectedItems[index].quantity || ''}
/>


                      </TableCell>
                      <TableCell align="right" padding="none">
                        {" "}
                        <TextField
                          type="number"
                          variant="standard"
                          {...formik.getFieldProps(
                            `selectedItems[${index}].cost`
                          )}
                          onChange={(e) => {
    handleCostChange(e, index);
    // Check for errors during the change event
    formik.setFieldTouched(`selectedItems[${index}].cost`, true);
  }}
    //                       onBlur={() => {
    //     formik.handleBlur({ target: { name: `selectedItems[${index}].cost` } });
    //     formik.setFieldTouched(`selectedItems[${index}].cost`, true);
    // }}
    onBlur={() => {
    formik.handleBlur({
      target: { name: `selectedItems[${index}].cost` },
    });
    formik.setFieldTouched(`selectedItems[${index}].quantity`, false);
  }}
  helperText={
    (formik.touched.selectedItems &&
      formik.errors.selectedItems &&
      formik.errors.selectedItems[index] &&
      formik.touched.selectedItems[index] &&
      formik.errors.selectedItems[index].cost) ||
    ''
  }
  error={
    (formik.touched.selectedItems &&
      formik.errors.selectedItems &&
      formik.errors.selectedItems[index] &&
      formik.touched.selectedItems[index] &&
      Boolean(formik.errors.selectedItems[index]?.cost)) ||
    false
  }
    value={formik.values.selectedItems[index].cost || ''}
                        />
                      </TableCell>
                      <TableCell align="right" padding="none">
                        {/* {typeof selectedItem.amount === 'number' ? selectedItem.amount : 'N/A'} */}
                        {formik.values.selectedItems[index].amount}{" "}
                      </TableCell>
                      <TableCell align="right" padding="none">
                        <IconButton
                          onClick={() => handleDeleteItem(index)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell padding="none">
                      <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={itemData}
                        value={null} // Pass null to clear the input field
                        inputValue={selectedItemCode}
                        onInputChange={(event, newValue) =>
                          setSelectedItemCode(newValue)
                        }
                        getOptionLabel={(option) => option.itemName}
                        onChange={handleItemChange}
                        onBlur={() => {
    formik.handleBlur({ target: { name: 'selectedItems' } });  // Manually trigger onBlur
    formik.setFieldTouched('selectedItems', true);  // Manually set field as touched
  }}
  //onFocus={() => formik.setFieldTouched('selectedItems', true)} 
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search Item"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            
                            }}
                            sx={{ width: "300%" }}
  
  
      error={
        (formik.touched.selectedItems &&
          Boolean(formik.errors.selectedItems) &&
          !Array.isArray(formik.errors.selectedItems)) ||
        (formik.touched.selectedItems &&
          Boolean(formik.errors.selectedItems) &&
          formik.errors.selectedItems.message)
      }
   
     
                          />
                        )}
                        renderOption={renderOption}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {formik.values.additionalCosts.length > 0 && (
              <TableContainer>
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Additional Cost</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formik.values.additionalCosts.map((cost, index) => (
                      <TableRow key={index}>
                        <TableCell padding="none">
                          <TextField
                            variant="standard"
                            // value={cost.cost}
                            // onChange={(e) => handleCostChange(index, e.target.value, 'cost')}
                            name={`additionalCosts[${index}].cost`}
                            value={cost.cost}
                            onChange={formik.handleChange}
                          />
                        </TableCell>
                        <TableCell padding="none" align="right">
                          <TextField
                            variant="standard"
                            type="number"
                            // value={cost.amount}
                            // onChange={(e) => handleCostChange(index, e.target.value, 'amount')}
                            name={`additionalCosts[${index}].amount`}
                            value={cost.amount}
                            onChange={formik.handleChange}
                          />
                        </TableCell>
                        <TableCell padding="none" align="right">
                          <IconButton onClick={() => handleDeleteCost(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Button
              variant="contained"
              color="primary"
              className="addAdditionalCost"
              onClick={handleAddCost}
            >
              <AddIcon /> Add Additional Cost
            </Button>
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
                    {/* Optional: Add a total row */}
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">
                      {calculateTotalAmount()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
        <Box style={{ textAlign: "right", marginTop: "10px" }}>
          {" "}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            align="right"
          >
            Create
          </Button>
        </Box>
      </div>
    </form>
  );
};

//export default CreatePurchaseOrder;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const itemData = [
//   {
//     itemCode: "001",
//     itemName: "Item 1",
//     incomingItem: "Incoming Item 1",
//     inStockItem: "In Stock Item 1",
//     itemQuantity: 10,
//     purchaseCost: 5.99,
//   },
//   {
//     itemCode: "111",
//     itemName: "Item 1",
//     incomingItem: "Incoming Item 1",
//     inStockItem: "In Stock Item 1",
//     itemQuantity: 10,
//     purchaseCost: 5.99,
//   },
//   {
//     itemCode: "112",
//     itemName: "Item 1",
//     incomingItem: "Incoming Item 1",
//     inStockItem: "In Stock Item 1",
//     itemQuantity: 10,
//     purchaseCost: 5.99,
//   },
//   {
//     itemCode: "002",
//     itemName: "Item 2",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "003",
//     itemName: "Item 3",
//     incomingItem: "Incoming Item 3",
//     inStockItem: "In Stock Item 3",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "004",
//     itemName: "Item 4",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "005",
//     itemName: "Item 5",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "006",
//     itemName: "Item 6",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "007",
//     itemName: "Item 7",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "008",
//     itemName: "Item 8",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "009",
//     itemName: "Item 9",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "010",
//     itemName: "Item 10",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "011",
//     itemName: "Item 11",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "012",
//     itemName: "Item 12",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "013",
//     itemName: "Item 13",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "014",
//     itemName: "Item 14",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "015",
//     itemName: "Item 15",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "016",
//     itemName: "Item 16",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "017",
//     itemName: "Item 17",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "018",
//     itemName: "Item 18",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "019",
//     itemName: "Item 19",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "020",
//     itemName: "Item 20",
//     incomingItem: "Incoming Item 2",
//     inStockItem: "In Stock Item 2",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "021",
//     itemName: "Item 21",
//     incomingItem: "Incoming Item 21",
//     inStockItem: "In Stock Item 21",
//     itemQuantity: 21,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "022",
//     itemName: "Item 22",
//     incomingItem: "Incoming Item 22",
//     inStockItem: "In Stock Item 22",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "023",
//     itemName: "Item 23",
//     incomingItem: "Incoming Item 23",
//     inStockItem: "In Stock Item 23",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "024",
//     itemName: "Item 24",
//     incomingItem: "Incoming Item 24",
//     inStockItem: "In Stock Item 24",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   {
//     itemCode: "025",
//     itemName: "Item 25",
//     incomingItem: "Incoming Item 25",
//     inStockItem: "In Stock Item 25",
//     itemQuantity: 20,
//     purchaseCost: 8.99,
//   },
//   // Add more items as needed
// ];

// const renderOption = (props, option, index) => (
//   <li {...props}>
//     <TableContainer>
//       <Table size="small">

//         {index === 0 && (
//           <TableHead>
//             <TableRow>
//               <TableCell>Item Code</TableCell>
//               <TableCell>Incoming Item</TableCell>
//               <TableCell>In Stock Item</TableCell>
//               <TableCell>Item Quantity</TableCell>
//               <TableCell>Purchase Cost</TableCell>
//             </TableRow>
//           </TableHead>
//         )}
//         <TableBody>
//           <TableRow>
//             <TableCell>{option.itemCode}</TableCell>
//             <TableCell>{option.incomingItem}</TableCell>
//             <TableCell>{option.inStockItem}</TableCell>
//             <TableCell>{option.itemQuantity}</TableCell>
//             <TableCell>{option.purchaseCost}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </li>
// );

// const renderOption = (props, option, index) => (
//   <li {...props}>
//     <TableContainer>
//       <Table size="small">
//         {/* {index === 0 && (
//           <TableHead>
//             <TableRow>
//               <TableCell>Item Code</TableCell>
//               <TableCell>Incoming Item</TableCell>
//               <TableCell>In Stock Item</TableCell>
//               <TableCell>Item Quantity</TableCell>
//               <TableCell>Purchase Cost</TableCell>
//             </TableRow>
//           </TableHead>
//         )} */}
//         <TableBody>
//           <TableRow>
//             <TableCell>{option.itemCode}</TableCell>
//             <TableCell>{option.incomingItem}</TableCell>
//             <TableCell>{option.inStockItem}</TableCell>
//             <TableCell>{option.itemQuantity}</TableCell>
//             <TableCell>{option.purchaseCost}</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </li>
// );

// const handleSubmit = async () => {
//   try {
//     const response = await axios.post('your_backend_api_url', {
//       selectedSupplierCode: values.selectedSupplierCode,
//       selectedStoreCode: values.selectedStoreCode,
//       purchaseOrderDate: values.purchaseOrderDate,
//       expectedDate: values.expectedDate,
//     });

//     console.log('API Response:', response.data);
//     // You can handle the response as needed
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle errors here
//   }
// };
