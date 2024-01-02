// import React from 'react'

// const Purchase = () => {
//   return (
//     <div>Purchase</div>
//   )
// }

// export default Purchase


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Purchase = () => {
    const navigate = useNavigate();
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const handleCreateStore = () => {
    // Replace '/create-store' with the path for creating a store
    navigate('/dashboard/inventory/createorder');
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
    <Button variant="contained" color="primary" onClick={handleCreateStore}>
        + ADD PURCHASE ORDER
      </Button>

      <style>
        {`
          .MuiDataGrid-row:hover {
            cursor: pointer;
          }
        `}
      </style>
      <DataGrid
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        {...data}
      />
    </div>
  );
}
export default Purchase