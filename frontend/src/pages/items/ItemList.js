



// correct form data table.

// import * as React from "react";
// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";
// //import Checkbox from '@mui/material/Checkbox';

// const columns: GridColDef[] = [
//   { field: "id", headerName: "Item Code", width: 76 },
//   { field: "itemName", headerName: "Item Name", width: 130 },
//   { field: "category", headerName: "Category", width: 100 },
//   {
//     field: "unit",
//     headerName: "Unit",
//     type: "number",
//     width: 95,
//   },
//   {
//     field: "purchasePrice",
//     headerName: "Purchase Price",
//     type: "number",
//     //description: "This column has a value getter and is not sortable.",
//     //sortable: false,
//     width: 120,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
//   {
//     field: "salePrice",
//     headerName: "Sale Price",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "wholesalePrice",
//     headerName: "Wholesale Price",
//     type: "number",
//     width: 140,
//   },
//   {
//     field: "minWholesaleQty",
//     headerName: "Min Wholesale Qty",
//     type: "number",
//     width: 135,
//   },
//   {
//     field: "minStockQty",
//     headerName: "Min Stock Qty",
//     type: "number",
//     width: 120,
//   },
//   {
//     field: "stockLocation",
//     headerName: "Stock Location",
//     type: "number",
//     width: 120,
//   },
//   {
//     field: "openingQtyStock",
//     headerName: "Opening Qty Stock",
//     type: "number",
//     width: 140,
//   },
//   {
//     field: "date",
//     headerName: "Date",
//     type: "number",
//     width: 100,
//   },
//   {
//     field: "description",
//     headerName: "Description",
//     type: "number",
//     width: 140,
//   },

//   {
//     field: "edit",
//     headerName: "Edit",
//     width: 60,
//     sortable: false,
//     filterable: false, // Set this to false to disable filtering for the 'Edit' column
//     renderCell: (params: GridValueGetterParams) => {
//       return (
//         <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
//           <EditIcon />
//         </IconButton>
//       );
//     },
//   },

//   {
//     field: "delete",
//     headerName: "Delete",
//     width: 60,
//     sortable: false,
//     filterable: false,
//     renderCell: (params: GridValueGetterParams) => {
//       return (
//         <IconButton
//           color="secondary"
//           onClick={() => handleDelete(params.row.id)}
//         >
//           <DeleteIcon />
//         </IconButton>
//       );
//     },
//   },
// ];

// // Define a function to handle edit action
// const handleEdit = (id) => {
//   // Add your edit logic here
//   console.log(`Edit item with ID ${id}`);
// };

// // Define a function to handle delete action
// const handleDelete = (id) => {
//   // Add your delete logic here
//   console.log(`Delete item with ID ${id}`);
// };
// //   itemCode: "",
// //   itemName: "",
// //   category: "",
// //   unit: "",
// //   purchasePrice: "",
// //   salePrice: "",
// //   wholesalePrice: "",
// //   minWholesaleQty: "",
// //   minStockQty: "",
// //   stockLocation: "",
// //   openingQtyStock: "",
// //   date: "",
// //   description: "",
// const rows = [
//   {
//     id: 1,
//     itemName: "Wathes",
//     category: "Jon",
//     unit: "Pieces",
//     purchasePrice: "223",
//     salePrice: "2000",
//     wholesalePrice: "33",
//     minWholesaleQty: "400",
//     minStockQty: "500",
//     stockLocation: "Riyadh",
//     openingQtyStock: "200",
//     date: "11/11/2000",
//     description: "Watches",
//   },
 
//     {
//       id: 2,
//       itemName: "Mobile",
//       category: "Jon",
//       unit: "Pieces",
//       purchasePrice: "223",
//       salePrice: "2000",
//       wholesalePrice: "33",
//       minWholesaleQty: "400",
//       minStockQty: "500",
//       stockLocation: "Riyadh",
//       openingQtyStock: "200",
//       date: "11/11/2000",
//       description: "Watches",
//     },
  
//       {
//         id: 3,
//         itemName: "Ultra",
//         category: "Jon",
//         unit: "Pieces",
//         purchasePrice: "223",
//         salePrice: "2000",
//         wholesalePrice: "33",
//         minWholesaleQty: "400",
//         minStockQty: "500",
//         stockLocation: "Riyadh",
//         openingQtyStock: "200",
//         date: "11/11/2000",
//         description: "Watches",
//       },
     
//         {
//           id: 4,
//           itemName: "Gadget",
//           category: "Jon",
//           unit: "Pieces",
//           purchasePrice: "223",
//           salePrice: "2000",
//           wholesalePrice: "23",
//           minWholesaleQty: "400",
//           minStockQty: "500",
//           stockLocation: "Riyadh",
//           openingQtyStock: "200",
//           date: "11/11/2000",
//           description: "Watches",
//         },
     
//           {
//             id: 5,
//             itemName: "Mobile",
//             category: "Jon",
//             unit: "Pieces",
//             purchasePrice: "223",
//             salePrice: "2000",
//             wholesalePrice: "21",
//             minWholesaleQty: "400",
//             minStockQty: "500",
//             stockLocation: "Riyadh",
//             openingQtyStock: "200",
//             date: "11/11/2000",
//             description: "Watches",
//           },
       
//             {
//               id: 6,
//               itemName: "Headphone",
//               category: "Jon",
//               unit: "Pieces",
//               purchasePrice: "223",
//               salePrice: "2000",
//               wholesalePrice: "66",
//               minWholesaleQty: "400",
//               minStockQty: "500",
//               stockLocation: "Riyadh",
//               openingQtyStock: "200",
//               date: "11/11/2000",
//               description: "Watches",
//             },
           
//               {
//                 id: 7,
//                 itemName: "Stand",
//                 category: "Jon",
//                 unit: "Pieces",
//                 purchasePrice: "223",
//                 salePrice: "2000",
//                 wholesalePrice: "55",
//                 minWholesaleQty: "400",
//                 minStockQty: "500",
//                 stockLocation: "Riyadh",
//                 openingQtyStock: "200",
//                 date: "11/11/2000",
//                 description: "Watches",
//               },
           
//                 {
//                   id: 8,
//                   itemName: "Camera",
//                   category: "Jon",
//                   unit: "Pieces",
//                   purchasePrice: "223",
//                   salePrice: "2000",
//                   wholesalePrice: "22",
//                   minWholesaleQty: "400",
//                   minStockQty: "500",
//                   stockLocation: "Riyadh",
//                   openingQtyStock: "200",
//                   date: "11/11/2000",
//                   description: "Watches",
//                 },
              
//                   {
//                     id: 9,
//                     itemName: "Camera",
//                     category: "Jon",
//                     unit: "Pieces",
//                     purchasePrice: "223",
//                     salePrice: "2000",
//                     wholesalePrice: "33",
//                     minWholesaleQty: "400",
//                     minStockQty: "500",
//                     stockLocation: "Riyadh",
//                     openingQtyStock: "200",
//                     date: "11/11/2000",
//                     description: "Watches",
//                   },
// ];

// export default function ItemList() {
//   const [openEditDialog, setOpenEditDialog] = React.useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
//   const [selectedItemId, setSelectedItemId] = React.useState(null);
//   ///const [selectedRows, setSelectedRows] = React.useState([]);

//   const navigate = useNavigate();

//   const handleEdit = (id) => {
//     setSelectedItemId(id);
//     setOpenEditDialog(true);
//   };

//   const handleDelete = (id) => {
//     setSelectedItemId(id);
//     setOpenDeleteDialog(true);
//   };

//   const handleConfirmEdit = () => {
//     // Add your edit logic here
//     console.log(`Edit item with ID ${selectedItemId}`);
//     setOpenEditDialog(false); // Close the edit dialog
//   };

//   const handleConfirmDelete = () => {
//     // Add your delete logic here
//     console.log(`Delete item with ID ${selectedItemId}`);
//     setOpenDeleteDialog(false); // Close the delete dialog
//   };

//   const handleCloseEditDialog = () => {
//     setOpenEditDialog(false);
//   };

//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//   };

//   const handleAddItem = () => {
//     // Add your logic to add a new item
//     navigate("/add-item");
//     console.log("Adding a new item");
//   };

//   //  const handleDeleteSelected = () => {
//   //   console.log("Deleting selected rows:", selectedRows);
//   //   setOpenDeleteDialog(true);
//   // };

//   const CustomToolbar = () => (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         margin: "0px",
//         paddingRight: "0px",
//       }}
//     >
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<AddIcon />}
//         onClick={handleAddItem}
//       >
//         Add Item
//       </Button>
//       {/* {selectedRows.length > 0 && (
//         <Button
//           variant="contained"
//           color="secondary"
//           startIcon={<DeleteIcon />}
//           onClick={handleDeleteSelected}
//           style={{ marginLeft: "8px" }}
//         >
//           Delete Selected
//         </Button>
//       )} */}
//     </div>
//   );

//   const handleRowClick = (params) => {
//     // Add your logic to navigate to the detail page
//     console.log(`Row clicked: ${params.id}`);
//   };

//   return (
//     <div style={{ height: 500, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         // onSelectionModelChange={(newSelection) => {
//         //   setSelectedRows(newSelection.selectionModel);
//         // }}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         onCellClick={(params) => {
//           const field = params.field;
//           if (field !== "edit" && field !== "delete") {
//             handleRowClick(params);
//           } else if (field === "edit") {
//             handleEdit(params.row.id);
//           } else if (field === "delete") {
//             handleDelete(params.row.id);
//           }
//         }}
//         slots={{
//           toolbar: CustomToolbar,
//         }}
//       />
//       <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
//         <DialogTitle>Edit Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to edit this item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmEdit} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
//         <DialogTitle>Delete Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this item?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from 'axios';

const columns = [
  { field: "id", headerName: "Item Code", width: 76 },
  {
    field: 'itemImage',
    headerName: 'Item Image',
    width: 150,
    renderCell: (params) => {
      // Remove the leading dot (.) before /public in the itemImage field
      const correctedImageUrl = `http://localhost:4000${params.row.itemImage.replace('./public', '/public')}`;
    
      console.log('Corrected Image URL:', correctedImageUrl);
    
      return (
        <img
          src={correctedImageUrl}
          alt={`Item ${params.row.itemCode}`}
          style={{ width: '70%', height: '55px' }}
          onError={(e) => console.error('Error loading image:', e)}
        />
      );
    }
    
  } , 
  { field: "itemName", headerName: "Item Name", width: 130 },
  { field: "category", headerName: "Category", width: 100 },
  {
    field: "unit",
    headerName: "Unit",
    type: "number",
    width: 95,
  },
  {
    field: "purchasePrice",
    headerName: "Purchase Price",
    type: "number",
    //description: "This column has a value getter and is not sortable.",
    //sortable: false,
    width: 120,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "salePrice",
    headerName: "Sale Price",
    type: "number",
    width: 100,
  },
  {
    field: "wholesalePrice",
    headerName: "Wholesale Price",
    type: "number",
    width: 140,
  },
  {
    field: "minWholesaleQty",
    headerName: "Min Wholesale Qty",
    type: "number",
    width: 135,
  },
  {
    field: "minStockQty",
    headerName: "Min Stock Qty",
    type: "number",
    width: 120,
  },
  {
    field: "stockLocation",
    headerName: "Stock Location",
    type: "number",
    width: 120,
  },
  {
    field: "openingQtyStock",
    headerName: "Opening Qty Stock",
    type: "number",
    width: 140,
  },
  {
    field: "date",
    headerName: "Date",
    type: "number",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    type: "number",
    width: 140,
  },
 
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function ItemList() {
  const [items, setItems] = useState([]);
  const pageSizeOptions = [5, 10, 20]; // You can customize the options
  useEffect(() => {
    // Fetch items from the API
    axios.get('http://localhost:4000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);
  return (
    <div style={{ height: 400, width: '100%' }}>
    {/* Add Item Button */}
    <Button
        variant="contained"
        color="primary"
        component={Link}  // Use Link component from react-router-dom
        to="/add-item"  // Specify the route where your add item form is located
        style={{ marginBottom: '16px' }}  // Add some spacing
      >
        Add Item
      </Button>
      <DataGrid
       rows={items}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 }, // Set the initial pageSize to 10
          },
        }}
        pageSizeOptions={pageSizeOptions}
       // checkboxSelection
      />
    </div>
  );
}