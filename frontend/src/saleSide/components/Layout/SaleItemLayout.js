import React from 'react'
import SideBar from "./SideBar";
import NavBar from "./AppBar";
import { Box } from '@mui/material';



const SaleItemLayout = () => {
  return (
   <>
    <NavBar/>
    <Box sx={{display:"flex"}} >
<SideBar/>
    </Box>
   </>
  )
}

export default SaleItemLayout