


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
//import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function createData(id,supplierCode, name, phone, email) {
  return {
    id,
    supplierCode,
    name,
    phone,
    email
  };
}



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'supplierCode',
    numeric: false,
    disablePadding: true,
    label: 'Supplier Code',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Phone number',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
 
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
    // console.log('Num Selected:', numSelected);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected,onDelete,onSearchChange
   //handleSearchClose, handleSearchOpen 
  } = props;
  const [searchText, setSearchText] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
console.log("Value of a Search Text",searchText);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
    //onClose();
  };
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchText('');
    onSearchChange({ target: { value: '' } });
  };

  // const handleSearchChange = (event) => {
  //   setSearchText(event.target.value);
  //   console.log("Text of Search",searchText)
  // };

  // Frontend code (e.g., in React component)

// const handleSearchChange = async (event) => {
//   setSearchText(event.target.value);
//   try {
//     // Make an API request to the backend search endpoint
//     const response = await axios.get(`http://localhost:4000/api/search?name=${event.target.value}`);
//     const searchResults = response.data;
//     // Handle the search results as needed (update state, display, etc.)
//     console.log('Search results:', searchResults);
//   } catch (error) {
//     console.error('Error searching suppliers:', error);
//     // Handle the error (display an error message, etc.)
//   }
// };

  const handleButtonClick = () => {
    // Navigate to the desired route
    navigate('/suppliercreate');
  };
 
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: 'space-between', // Adjusted alignment
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick} // Replace with your actual logic
      >
        Add a Supplier
      </Button>
  
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        {searchOpen ? (
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
             value={searchText}
            //onChange={handleSearchChange}
           /// onChange={onSearchChange}
            onChange={(e) => {
              setSearchText(e.target.value);
              onSearchChange(e); // You may need to pass the event to onSearchChange
            }}
            sx={{ width: 200, marginRight: 1 }} // Adjust width and margin as needed
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClose}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <>
            {numSelected > 0 ? (
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selected
              </Typography>
            ) : (
              ""
            )}
          </>
        )}
      </div>
  
      {numSelected === 0 && !searchOpen && (
        <Tooltip title="Search">
          <IconButton onClick={handleSearchOpen}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      )}
  
      {numSelected > 0 && (
  <div>
    <Tooltip title="Delete">
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Dialog
      open={openDialogue}
      //onClose={onClose}
      onClose={handleCloseDialogue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete supplier"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the supplier?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogue}>Cancel</Button>
        {/* <Button onClick={onDelete} autoFocus>
          Delete
        </Button> */}
        {/* <Button
          onClick={() => {
            onDelete();
            handleCloseDialogue(); // Close the dialog after onDelete completes
          }}
          autoFocus
        >
          Delete
        </Button> */}
        <Button
          onClick={async () => {
            // Call onDelete function
            await onDelete();
            
            // Close the dialog after onDelete completes
            handleCloseDialogue();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)}

    </Toolbar>
  );
  
  

}


EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired, // Add the onDelete prop type
  onSearchChange: PropTypes.func, // Add the onSearchChange prop type
  //handleSearchClose:PropTypes.func.isRequired,  // Pass handleSearchClose
  //handleSearchOpen:PropTypes.func.isRequired,    // Pass handleSearchOpen
};

const SupplierList=()=>{
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  //const [selectedRowData, setSelectedRowData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);  // State to store fetched data
  //const [searchText, setSearchText] = React.useState('');
  // const [searchOpen, setSearchOpen] = React.useState(false);

// useEffect hook to make the API call when the component mounts

const navigate = useNavigate();

// const handleSearchOpen = () => {
//   setSearchOpen(true);
// };

// const handleSearchClose = () => {
//   setSearchOpen(false);
// };

const fetchData = async () => {
  try {
    // Make the API call using axios
    const response = await axios.get('http://localhost:4000/api/suppliers');
    
    // Axios automatically parses the JSON response, so you can directly access the data property
    const data = response.data;

    // Map the fetched data to the format expected by the createData function
    const formattedData = data.map((item, index) =>
      createData(index + 1, item.supplierCode, item.name, item.phone, item.email)
    );
    setRows(formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
// useEffect(() => {
 

//   fetchData(); // Call the fetchData function
// }, []);


const handleDeleteSelectedRows = async () => {
  try {
    // Ensure there are selected rows to delete
    if (selected.length === 0) {
      console.log('No rows selected for deletion');
      return;
    }

    // Extract supplierCode values from selected rows
    const selectedSupplierCodes = rows
      .filter((row) => selected.includes(row.id))
      .map((row) => row.supplierCode);
      console.log("These supplier Codes are selected for deletion",selectedSupplierCodes)

    // Make a DELETE request to your backend API to delete selected rows

    await axios.post('http://localhost:4000/api/deleteSuppliersByCodes', { 
      supplierCodes: selectedSupplierCodes,
    });
   

    // Log success or perform other actions as needed
    console.log('Selected rows deleted successfully');

    // Clear the selection after successful deletion
    setSelected([]);
    // Refetch the data to update the table
    fetchData();
  } catch (error) {
    // Handle errors, show a message, or perform other actions as needed
    console.error('Error deleting selected rows:', error);
  }
  // finally {
  //   // Close the dialog
  //   handleCloseDialogue();
  
  // }
};

// const handleSearchChange = async (event) => {
//   setSearchText(event.target.value);
//   try {
//     // Make an API request to the backend search endpoint
//     const response = await axios.get(`http://localhost:4000/api/search?name=${event.target.value}`);
//     const searchResults = response.data;
//     // Handle the search results as needed (update state, display, etc.)
//     console.log('Search results:', searchResults);
//   } catch (error) {
//     console.error('Error searching suppliers:', error);
//     // Handle the error (display an error message, etc.)
//   }
// };






// const handleSearchChange = async (event) => {
//   try {
//     const query = event.target.value;
//     //setSearchText(query);
  

//     // Make a request to the backend API
//     const response = await axios.get(`http://localhost:4000/api/search?name=${query}`);

//     const data = response.data;

//     // Map the fetched data to the format expected by the createData function
//     const formattedData = data.map((item, index) =>
//       createData(index + 1, item.supplierCode, item.name, item.phone, item.email)
//     );
//     setRows(formattedData);
//   } catch (error) {
//     console.error('Error searching suppliers:', error);
//   }
// };

const handleSearchChange = async (event) => {
  try {
    const query = event.target.value;
  console.log("Value of quer",query);
    // Make a request to the backend API only if the query is not empty
    if (query.trim() !== '') {
      const response = await axios.get(`http://localhost:4000/api/search?name=${query}`);
      const data = response.data;

      // Map the fetched data to the format expected by the createData function
      const formattedData = data.map((item, index) =>
        createData(index + 1, item.supplierCode, item.name, item.phone, item.email)
      );
      setRows(formattedData);
    } else {
      // If the query is empty, fetch the original data
      fetchData();
    }
  } catch (error) {
    console.error('Error searching suppliers:', error);
  }
};


useEffect(() => {
 

  fetchData(); // Call the fetchData function
}, []);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

//  const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       // Log the data of all selected rows
//       const selectedRowsData = rows.filter((row) => newSelected.includes(row.id));
//       console.log('Selected Rows Data:', selectedRowsData);
//       return;
//     }
//     setSelected([]);
//     // Log that all rows are deselected
//     console.log('All rows deselected');
//   }; 


const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelected = rows.map((n) => n.id);
    setSelected(newSelected);

    // Extract supplierCode values from selected rows
    const selectedSupplierCodes = rows
      .filter((row) => newSelected.includes(row.id))
      .map((row) => row.supplierCode);

    console.log('Selected Supplier Codes:', selectedSupplierCodes);
    return;
  }

  setSelected([]);
  // Log that all rows are deselected
  console.log('All rows deselected');
};



  const handleClick = (event, id) => {
    const isCheckboxClick = event.target.tagName === 'INPUT' && event.target.type === 'checkbox';
  
    if (isCheckboxClick) {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      // Ensure rows is defined and each row has a 'supplierCode' property
      const supplierCodesOfSelectedRows = newSelected.map((index) => {
        const row = rows[index];
        return row && row.supplierCode ? row.supplierCode : null;
      });
  
      console.log('Supplier Codes of Selected Rows:', supplierCodesOfSelectedRows);
  
       setSelected(newSelected);
      // console.log('Selected Rows:', newSelected);
    } else {
      // Handle row click
      const clickedRowData = rows.find((row) => row.id === id);
      console.log('Row Clicked! Data:', clickedRowData);
      navigate(`/supplierupdate/${clickedRowData.supplierCode}`);
    }
  };
  
  

  


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,rows],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length}  onDelete={() => handleDeleteSelectedRows(selected)}
         onSearchChange={handleSearchChange}
         // handleSearchClose={handleSearchClose} handleSearchOpen={handleSearchOpen} 

          />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                   key={row.id}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.supplierCode}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}



export default SupplierList