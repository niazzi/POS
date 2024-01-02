import * as React from "react";
import { Link } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReportsIcon from "@mui/icons-material/Assessment";
import TaxIcon from "@mui/icons-material/MonetizationOn";
import ProductIcon from "@mui/icons-material/LocalMall";
import InventoryIcon from "@mui/icons-material/Store";
//import EmployeesIcon from '@mui/icons-material/Group';
import BadgeIcon from "@mui/icons-material/Badge";
import CustomersIcon from "@mui/icons-material/People";
import IntegrationsIcon from "@mui/icons-material/SettingsEthernet";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBarNav({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [reportsAnchorEl, setReportsAnchorEl] = React.useState(null);
  const [itemsAnchorEl, setItemsAnchorEl] = React.useState(null);
  const [dealsAnchorEl, setDealsAnchorEl] = React.useState(null);
  const [employeesAnchorEl, setEmployeesAnchorEl] = React.useState(null);
  const [inventoryAnchorEl, setInventoryAnchorEl] = React.useState(null);
  //const [anchorEl, setAnchorEl] = React.useState(null);

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleReportsClick = (event) => {
    if (!reportsAnchorEl) {
      setReportsAnchorEl(event.currentTarget);
    } else {
      setReportsAnchorEl(null);
    }
  };
  const handleItemsClick = (event) => {
    if (!itemsAnchorEl) {
      setItemsAnchorEl(event.currentTarget);
    } else {
      setItemsAnchorEl(null);
    }
  };

  const handleReportsClose = () => {
    setReportsAnchorEl(null);
  };
  const handleItemsClose = () => {
    setItemsAnchorEl(null);
  };
  const handleDealsClick = (event) => {
    if (!dealsAnchorEl) {
      setDealsAnchorEl(event.currentTarget);
    } else {
      setDealsAnchorEl(null);
    }
  };
  const handleDealsClose = () => {
    setDealsAnchorEl(null);
  };

  const handleInventoryClick = (event) => {
    if (!inventoryAnchorEl) {
      setInventoryAnchorEl(event.currentTarget);
    } else {
      setInventoryAnchorEl(null);
    }
  };
  const handleInventoryClose = () => {
    setInventoryAnchorEl(null);
  };

  const handleEmployeesClick = (event) => {
    if (!employeesAnchorEl) {
      setEmployeesAnchorEl(event.currentTarget);
    } else {
      setEmployeesAnchorEl(null);
    }
  };
  const handleEmployeesClose = () => {
    setEmployeesAnchorEl(null);
  };
  const handleCustomersClick = (event) => {
    navigate("/add-customer");
  };
  const handleSettingsClick = (event) => {
    navigate("/dashboard/settings");
  };
  // Function to get the path based on the icon text

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Aisl Point of Sale ( APOS)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            "Reports",
            "Items",
            "Deals",
            "Inventory Management",
            "BadgeIcon",
            "Customers",
            "Integrations",
            "Settings",
            "Help",
          ].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={(event) => {
                  // Pass the event object
                  if (text === "Reports") {
                    handleReportsClick(event); // Pass the event here
                  } else if (text === "Items") {
                    handleItemsClick(event); // Pass the event here
                  } else if (text === "Deals") {
                    handleDealsClick(event); // Pass the event here
                  } else if (text === "Inventory Management") {
                    handleInventoryClick(event); // Pass the event here
                  } else if (text === "Customers") {
                    // Handle Customers click here
                    handleCustomersClick(event);
                  } else if (text === "BadgeIcon") {
                    handleEmployeesClick(event); // Pass the event here
                  }else if (text === "Settings") {
                    handleSettingsClick(event); // Pass the event here
                  }
                  // Handle other cases or do nothing
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {text === "Reports" ? (
                    <ReportsIcon />
                  ) : text === "Items" ? (
                    <ProductIcon />
                  ) : text === "Deals" ? (
                    <ProductIcon />
                  ) : text === "Inventory Management" ? (
                    <InventoryIcon />
                  ) : text === "BadgeIcon" ? (
                    <BadgeIcon />
                  ) : text === "Customers" ? (
                    <CustomersIcon />
                  ) : text === "Integrations" ? (
                    <IntegrationsIcon />
                  ) : text === "Settings" ? (
                    <SettingsIcon />
                  ) : text === "Help" ? (
                    <HelpIcon />
                  ) : (
                    <TaxIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Menu
        anchorEl={reportsAnchorEl}
        open={Boolean(reportsAnchorEl)}
        onClose={handleReportsClose}
      >
        <MenuItem component={Link} to="/">
          Sales summary
        </MenuItem>
        <MenuItem component={Link} to="">
          Sales by item
        </MenuItem>
        <MenuItem>Sales by category</MenuItem>
        <MenuItem>Sales by employee</MenuItem>
        <MenuItem>Sales by Payment Type</MenuItem>
        <MenuItem>Reciepts</MenuItem>
        <MenuItem>Sales By Modifier</MenuItem>
        <MenuItem>Discount</MenuItem>
        <MenuItem>Taxes</MenuItem>
      </Menu>
      <Menu
        anchorEl={itemsAnchorEl}
        open={Boolean(itemsAnchorEl)}
        onClose={handleItemsClose}
      >
        <MenuItem component={Link} to="/item-list">
          Items
        </MenuItem>
        <MenuItem component={Link} to="/item-category">
          Categories
        </MenuItem>
        <MenuItem component={Link} to="/item-modifier">
          Modifiers
        </MenuItem>
        <MenuItem component={Link} to="/item-discount">
          Discounts
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={dealsAnchorEl}
        open={Boolean(dealsAnchorEl)}
        onClose={handleDealsClose}
      >
        <MenuItem component={Link} to="/deal-list">
          Deals
        </MenuItem>
        {/* <MenuItem component={Link} to="/item-category">Categories</MenuItem>
        <MenuItem component={Link} to="/item-modifier">Modifiers</MenuItem>
        <MenuItem component={Link} to="/item-discount">Discounts</MenuItem> */}
      </Menu>
      <Menu
        anchorEl={inventoryAnchorEl}
        open={Boolean(inventoryAnchorEl)}
        onClose={handleInventoryClose}
      >
       <MenuItem component={Link} to="/dashboard/inventory/purchase">
          Purchase Orders
        </MenuItem>
        <MenuItem component={Link} to="/supplierlist">
          Suppliers
        </MenuItem>
        {/* <MenuItem component={Link} to="/item-category">Categories</MenuItem>
        <MenuItem component={Link} to="/item-modifier">Modifiers</MenuItem>
        <MenuItem component={Link} to="/item-discount">Discounts</MenuItem> */}
      </Menu>
      <Menu
        anchorEl={employeesAnchorEl}
        open={Boolean(employeesAnchorEl)}
        onClose={handleEmployeesClose}
      >
        <MenuItem component={Link} to="/add-employee">
          Employee
        </MenuItem>
        <MenuItem component={Link} to="/access-right">
          Access Rights
        </MenuItem>
        {/* <MenuItem component={Link} to="/item-modifier">Modifiers</MenuItem>
        <MenuItem component={Link} to="/item-discount">Discounts</MenuItem> */}
      </Menu>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
        <Typography paragraph>{/* Your content here */}</Typography>
      </Box>
    </Box>
  );
}
