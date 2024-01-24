// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// const Stores = () => {
//   const navigate = useNavigate();

//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 10,
//     maxColumns: 6,
//   });

//   const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

//   const handleRowSelection = (newRowSelectionModel) => {
//     setRowSelectionModel(newRowSelectionModel);

//     // Assuming each row has an 'id' property
//     const selectedRowId = newRowSelectionModel[0];

//     if (selectedRowId) {
//       // Replace '/your-target-page' with the path you want to navigate to
//       navigate(`/your-target-page/${selectedRowId}`);
//     }
//   };
//   const handleCreateStore = () => {
//     // Replace '/create-store' with the path for creating a store
//     navigate('/dashboard/settings/createstore');
//   };

//   return (

//     <div style={{ height: 400, width: '120%' }}>
//      <Button variant="contained" color="primary" onClick={handleCreateStore}>
//         Create Store
//       </Button>

//       <style>
//         {`
//           .MuiDataGrid-row:hover {
//             cursor: pointer;
//           }
//         `}
//       </style>
//       <DataGrid
//         onRowSelectionModelChange={handleRowSelection}
//         rowSelectionModel={rowSelectionModel}
//         {...data}
//       />
//     </div>

//   );
// };

// export default Stores;

import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Stores = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/stores");
        const data = await response.json();
        // Add a unique 'id' property to each row using 'storeCode' from the API response
        const rowsWithId = data.map((row) => ({ ...row, id: row.storeCode }));

        setStoreData(rowsWithId);
        //setStoreData(data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchStoreData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleRowSelection = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    const selectedRowId = newRowSelectionModel[0];

    if (selectedRowId) {
      // Replace '/your-target-page' with the path you want to navigate to
      navigate(`/dashboard/settings/updatestore/${selectedRowId}`);
    }

    // You can access the selected row data from the state (storeData) based on newRowSelectionModel
  };

  const handleCreateStore = () => {
    // Replace '/create-store' with the path for creating a store
    navigate("/dashboard/settings/createstore");
  };

  const columns = [
    // Define your DataGrid columns based on the structure of your store data
    // Example: { field: 'id', headerName: 'ID', flex: 1 },
    // Add more columns as needed
    { field: "id", headerName: "Store Code", width: 150 },
    //{ field: "address", headerName: "address", width: 100 },
    // {
    //   field: 'address',
    //   headerName: 'Address',
    //   width: 200,
    //   renderCell: (params) => {
    //     const { data } = params.row;
    //     const { address, city, region, postalCode, country } = data;

    //     if (address) {
    //       return address;
    //     } else if (country) {
    //       // If 'country' is an object, display the 'label' property
    //       const countryLabel = country.label || ''; // Use an empty string if 'label' is not present
    //       return countryLabel;
    //     } else if (city || region || postalCode || country) {
    //       // Display a combination of city, region, postalCode, and country if address and country are not present
    //       const components = [city, region, postalCode, country].filter(Boolean);
    //       return components.join(', ');
    //     } else {
    //       return ''; // If none of the fields are present
    //     }
    //   },
    // },
    { field: "name", headerName: "Store Name", width: 150 },
    {
      field: "address",
      headerName: "Address",
      width: 250,
      renderCell: (params) => {
        const { row } = params;

        // Check if row is defined before destructure
        if (!row) {
          return ""; // or handle accordingly
        }

        const { address, city, region, postalCode, country } = row;

        if (address) {
          return address;
        }
        // else if (country) {
        //   // If 'country' is an object, display the 'label' property
        //   const countryLabel = country.label || ''; // Use an empty string if 'label' is not present
        //   return countryLabel;
        // }
        else if (city || region || postalCode || country) {
          // If 'country' is an object and not the default country, display the 'label' property
          // const countryLabel = country.label !== 'Default Country' ? country.label : '';
          const countryLabel = country.label || "";
          // Display a combination of city, region, postalCode if address and country are not present
          const components = [city, region, postalCode, countryLabel].filter(
            Boolean
          );
          return components.join(", ");
        } else {
          return ""; // If none of the fields are present
        }
      },
    },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Button variant="contained" color="primary" onClick={handleCreateStore}>
        Create Store
      </Button>

      <style>
        {`
          .MuiDataGrid-row:hover {
            cursor: pointer;
          }
        `}
      </style>
      <DataGrid
        columns={columns}
        rows={storeData}
        //checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={rowSelectionModel}
      />
    </div>
  );
};

export default Stores;

// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function CreateStore() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 10,
//     maxColumns: 6,
//   });

//   const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
//   console.log(rowSelectionModel)

//   // const handleShowSelectedRows = () => {
//   //   const selectedRows = data.rows.filter((row) =>
//   //     rowSelectionModel.includes(row.id)
//   //   );
//   //   console.log('Selected Rows:', selectedRows);
//   // };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//     <style>
//         {`
//           .MuiDataGrid-row:hover {
//             cursor: pointer;
//           }
//         `}
//       </style>
//       <DataGrid
//         // checkboxSelection
//         onRowSelectionModelChange={(newRowSelectionModel) => {
//           setRowSelectionModel(newRowSelectionModel);
//         }}
//         rowSelectionModel={rowSelectionModel}
//         {...data}
//       />
//       {/* <button onClick={handleShowSelectedRows}>Show Selected Rows</button> */}
//     </div>
//   );
// }
