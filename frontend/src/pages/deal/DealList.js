// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

// const data = [
//   {
//     dealCode: 'D001',
//     dealName: 'Special Deal',
//     dealPrice: '$50',
//     grandTotal: '$200',
//     itemCode: 'I001',
//     itemName: 'Product A',
//     itemQty: '2',
//     salePrice: '$30',
//     discount: '$5',
//     offerPrice: '$25',
//     totalPrice: '$50',
//   },
//   // Add more data objects as needed
// ];

// const DealList = () => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Deal Code</TableCell>
//             <TableCell>Deal Name</TableCell>
//             <TableCell>Deal Price</TableCell>
//             <TableCell>Grand Total</TableCell>
//             <TableCell>Item Code</TableCell>
//             <TableCell>Item Name</TableCell>
//             <TableCell>Item Qty</TableCell>
//             <TableCell>Sale Price</TableCell>
//             <TableCell>Discount</TableCell>
//             <TableCell>Offer Price</TableCell>
//             <TableCell>Total Price</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.dealCode}</TableCell>
//               <TableCell>{row.dealName}</TableCell>
//               <TableCell>{row.dealPrice}</TableCell>
//               <TableCell>{row.grandTotal}</TableCell>
//               <TableCell>{row.itemCode}</TableCell>
//               <TableCell>{row.itemName}</TableCell>
//               <TableCell>{row.itemQty}</TableCell>
//               <TableCell>{row.salePrice}</TableCell>
//               <TableCell>{row.discount}</TableCell>
//               <TableCell>{row.offerPrice}</TableCell>
//               <TableCell>{row.totalPrice}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default DealList;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";

//const rowsPerPageOptions = [5, 10, 25];

const DealList = () => {
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState([10]);
  const navigate = useNavigate();
  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddDealClick = () => {
    // Navigate to another page
    navigate('/add-deal')
  };
  const data = [
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
    {
      dealCode: "D001",
      dealName: "Special Deal",
      dealPrice: "$50",
      grandTotal: "$200",
      itemCode: "I001",
      itemName: "Product A",
      itemQty: "2",
      salePrice: "$30",
      discount: "$5",
      offerPrice: "$25",
      totalPrice: "$50",
    },
  ];

  //   const slicedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const slicedData =
    data.length > 0
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : [];

  return (
    <div>
    <Button variant="contained" color="primary" style={{ marginBottom: '16px' }} onClick={handleAddDealClick}>
        Add Deal
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Deal Code</TableCell>
              <TableCell>Deal Name</TableCell>
              <TableCell>Deal Price</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Qty</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Offer Price</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.dealCode}</TableCell>
                <TableCell>{row.dealName}</TableCell>
                <TableCell>{row.dealPrice}</TableCell>
                <TableCell>{row.grandTotal}</TableCell>
                <TableCell>{row.itemCode}</TableCell>
                <TableCell>{row.itemName}</TableCell>
                <TableCell>{row.itemQty}</TableCell>
                <TableCell>{row.salePrice}</TableCell>
                <TableCell>{row.discount}</TableCell>
                <TableCell>{row.offerPrice}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
            ))}
            {/* {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))}
            {slicedData.map((row, index) => (
              <TableRow key={index}>
              <TableCell>{row.dealCode}</TableCell>
              <TableCell>{row.dealName}</TableCell>
              <TableCell>{row.dealPrice}</TableCell>
              <TableCell>{row.grandTotal}</TableCell>
              <TableCell>{row.itemCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>              
               <TableCell>{row.itemQty}</TableCell>
               <TableCell>{row.salePrice}</TableCell>
               <TableCell>{row.discount}</TableCell>
               <TableCell>{row.offerPrice}</TableCell>
               <TableCell>{row.totalPrice}</TableCell>
              </TableRow>
              
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
};

export default DealList;
