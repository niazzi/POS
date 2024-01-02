import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import InventoryIcon from "@mui/icons-material/Store";
import Stores from "./stores/Stores";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {/* {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )} */}
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = React.useState(8);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="settigs-verticalTabsContainer">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className="settigs-verticalTabs"
      >
        <Tab
          label={
            <div className="heading-settigs-verticalTabsContainer">
              <div className="heading-settigs-verticalTabsItem">
                <SettingsIcon fontSize="large" />
                <Typography
                  variant="h6"
                  className="settigs-verticalTabsTypography"
                >
                  Settings
                </Typography>
              </div>
              <Typography
                variant="subtitle1"
                component="p"
                className="settigs-smallHeading"
              >
                System settings
              </Typography>
            </div>
          }
          {...a11yProps(0)}
          disabled
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />

        <Tab
          label="Features"
          {...a11yProps(1)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />
        <Tab
          label="Billing  & subscriptions"
          {...a11yProps(2)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
            whiteSpace: "nowrap",
          }}
        />
        <Tab
          label="Payment types"
          {...a11yProps(3)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />
        <Tab
          label="Loyalty"
          {...a11yProps(4)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />
        <Tab
          label="Taxes"
          {...a11yProps(5)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />
        <Tab
          label="Receipt"
          {...a11yProps(6)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />

        <Tab
          label={
            <div className="heading-settigs-verticalTabsContainer">
              <div className="heading-settigs-verticalTabsItem">
                <InventoryIcon fontSize="large" />
                <Typography
                  variant="h6"
                  className="settigs-verticalTabsTypography"
                >
                  Stores
                </Typography>
              </div>
              <Typography
                variant=""
                component=""
                className="settigs-smallHeading"
              >
                Store & POS settings
              </Typography>
            </div>
          }
          {...a11yProps(7)}
          disabled
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        />
        <Tab
          label="Stores"
          {...a11yProps(8)}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "start",
          }}
        />
      </Tabs>
      <TabPanel value={value} index={1}>
        Features
      </TabPanel>
      <TabPanel value={value} index={2}>
        Billing & subscriptions
      </TabPanel>
      <TabPanel value={value} index={3}>
        Payment types
      </TabPanel>
      <TabPanel value={value} index={4}>
        Loyalty
      </TabPanel>
      <TabPanel value={value} index={5}>
        Taxes
      </TabPanel>
      <TabPanel value={value} index={6}>
        Receipt
      </TabPanel>

      <TabPanel value={value} index={8}>
      <Stores/>
     
      </TabPanel>
    
    </Box>
  );
};

export default Settings;
