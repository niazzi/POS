import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/dashboard/getCategories');
        
        // Add a unique 'id' property to each row using 'categoryCode' from the API response
        const categoriesWithId = response.data.map((row) => ({ ...row, id: row.categoryCode }));
        
        setCategories(categoriesWithId);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleAddCategoryClick = () => {
    // Navigate to another page
    navigate('/add-category');
  };

  // const handleRowSelectionModelChange = (newRowSelectionModel, event) => {
  //   console.log('Row Selection Changed:', newRowSelectionModel);
  //   setRowSelectionModel(newRowSelectionModel);
  //   // const selectedRowId = newRowSelectionModel[0];
  //   // navigate(`/dashboard/goods/categoryedit/${selectedRowId}`);
  //    // Check if a row is clicked (not a checkbox)
  //   if (
  //   newRowSelectionModel.length === 1 &&
  //   event &&
  //   event.type === 'click' &&
  //   event.currentTarget &&
  //   event.currentTarget.tagName !== 'INPUT'
  // ) {
  //     const selectedRowId = newRowSelectionModel[0];
  //     navigate(`/dashboard/goods/categoryedit/${selectedRowId}`);
  //   }
   
  // };


  // const handleRowSelectionModelChange = (newRowSelectionModel, event) => {
  //   console.log('Row Selection Changed:', newRowSelectionModel);

  //   // Check if the event is defined and the target is a checkbox
  //   const isCheckboxClick = event && event.target && event.target.tagName === 'INPUT' && event.target.type === 'checkbox';

  //   if (!isCheckboxClick) {
  //     // Navigate only when a row is clicked
  //     if (newRowSelectionModel.length === 1) {
  //       const selectedRowId = newRowSelectionModel[0];
  //       navigate(`/dashboard/goods/categoryedit/${selectedRowId}`);
  //     } else {
  //       // Update the row selection model for other row selection changes
  //       setRowSelectionModel(newRowSelectionModel);
  //     }
  //   } else {
  //     // Update the row selection model for checkbox changes
  //     setRowSelectionModel(newRowSelectionModel);
  //   }
  // };


  const handleRowSelectionModelChange = (params) => {
    // Check if params and params.selectionModel are defined
    if (params && params.selectionModel) {
      if (params.selectionModel.length === 1 && params.isRowSelected) {
        const selectedRowId = params.selectionModel[0];
        navigate(`/dashboard/goods/categoryedit/${selectedRowId}`);
      } else {
        // Update the row selection model for other row selection changes
        setRowSelectionModel(params.selectionModel);
      }
    }
  };
  // const handleCheckboxSelectionChange = (params) => {
  //   console.log('Checkbox Selection Changed:', params);
  // };
 
  const handleCheckboxSelectionChange = (params) => {
    // Update the row selection model for checkbox changes
    setRowSelectionModel(params.selectionModel);
  };
  const handleDeleteClick = () => {
    // Handle the delete action when the delete button is clicked
    console.log('Delete Button Clicked:', rowSelectionModel);
  };

  const columns = [
    { field: 'categoryCode', headerName: 'Category Code',width: 150 },
    { field: 'categoryName', headerName: 'Category Name',width: 150 },
    { field: 'categoryColor', headerName: 'Category Color', width: 150},
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={handleAddCategoryClick}>
          Add Category
        </Button>
        
        {rowSelectionModel && rowSelectionModel.length > 0 && (
          <IconButton color="primary" aria-label="Delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        )}
        <style>
        {`
          .MuiDataGrid-row:hover {
            cursor: pointer;
          }
        `}
      </style>
        <DataGrid
          checkboxSelection
          rows={categories}
          columns={columns}
          pageSize={5}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          onSelectionModelChange={handleCheckboxSelectionChange}
          rowSelectionModel={rowSelectionModel}
        />
      </Paper>
    </div>
  );
};

export default CategoryList;



