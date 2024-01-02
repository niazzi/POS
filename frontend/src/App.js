import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SalesSummary from "./pages/reports/salesSummary";
import SideBarNav from "./components/dashboardLayout/sidebarNav";
//import { DashboardLayout } from "./components/dashboardLayout/DashboardLayout";

//import Items Pages
import ItemList from "./pages/items/ItemList";
import Categories from "./pages/items/Categories";
import Modifiers from "./pages/items/Modifiers";
import Discounts from "./pages/items/Discounts";
import AddItem from "./pages/items/AddItem";
import CategoryList from "./pages/items/CategoryList";

//import Deal Pages
import DealList from "./pages/deal/DealList";
import AddDeal from "./pages/deal/AddDeal";

//import customer pages
import Customer from "./customer/Customer";

//import employee pages

import AddEmployee from "./pages/employee/AddEmployee";
import AccessRights from "./pages/employee/AccessRights";

//import sale side pages
import SideBar from "./saleSide/components/Layout/SideBar";
//import show item
import Item from "./saleSide/pages/saleItem/Item";

//import payments
import PaymentItem from "./saleSide/pages/paymentFolder/PaymentItem";
import AfterPaymentItem from "./saleSide/pages/paymentFolder/AfterPaymentItem";

//import Inventory Management
import CreateSuppliers from "./pages/InventoryManagement/Suppliers/CreateSuppliers";
import SupplierList from "./pages/InventoryManagement/Suppliers/SupplierList";
import UpdateSupplier from "./pages/InventoryManagement/Suppliers/UpdateSupplier";
import Purchase from "./pages/InventoryManagement/Purchase/Purchase";
//import CreatePurchaseOrder from "./pages/InventoryManagement/Purchase/CreateOrder";
import CreatePurchaseOrder from "./pages/InventoryManagement/Purchase/CreatePurchaseOrder";

//settings
//import settings
import Settings from "./pages/settings/Settings";
import CreateStore from "./pages/settings/stores/CreateStore";
import UpdateStore from "./pages/settings/stores/UpdateStore";

//import reciepts

import ReceiptsShow from "./saleSide/pages/receipts/ReceiptsShow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SideBarNav>
              <SalesSummary />
            </SideBarNav>
          }
        />
        <Route
          path="/item-list"
          element={
            <SideBarNav>
              <ItemList />
            </SideBarNav>
          }
        />
        <Route
          path="/add-category"
          element={
            <SideBarNav>
              <Categories />
            </SideBarNav>
          }
        />
        <Route
          path="/item-modifier"
          element={
            <SideBarNav>
              <Modifiers />
            </SideBarNav>
          }
        />
        <Route
          path="/item-discount"
          element={
            <SideBarNav>
              <Discounts />
            </SideBarNav>
          }
        />
        <Route
          path="/add-item"
          element={
            <SideBarNav>
              <AddItem />
            </SideBarNav>
          }
        />
        <Route
          path="/item-category"
          element={
            <SideBarNav>
              <CategoryList />
            </SideBarNav>
          }
        />

           {/* for setting */}
        {/* for import routes */}
        <Route
          path="/dashboard/settings"
          element={
            <SideBarNav>
              <Settings />
            </SideBarNav>
          }
        />
         <Route
          path="/dashboard/settings/createstore"
          element={
            <SideBarNav>
              <CreateStore />
            </SideBarNav>
          }
        />
         <Route
          path="/dashboard/settings/updatestore/:storeCode"
          element={
            <SideBarNav>
              <UpdateStore />
            </SideBarNav>
          }
        />

        {/* Route of Deal */}

        <Route
          path="/deal-list"
          element={
            <SideBarNav>
              <DealList />
            </SideBarNav>
          }
        />
        <Route
          path="/add-deal"
          element={
            <SideBarNav>
              <AddDeal />
            </SideBarNav>
          }
        />

        {/* for customer routes */}

        <Route
          path="/add-customer"
          element={
            <SideBarNav>
              <Customer />
            </SideBarNav>
          }
        />

        {/* for employee routes */}
        <Route
          path="/add-employee"
          element={
            <SideBarNav>
              <AddEmployee />
            </SideBarNav>
          }
        />

        <Route
          path="/access-right"
          element={
            <SideBarNav>
              <AccessRights />
            </SideBarNav>
          }
        />
            {/* for Inventory Management routes */}
        <Route
          path="/suppliercreate"
          element={
            <SideBarNav>
              <CreateSuppliers />
            </SideBarNav>
          }
        />
        <Route
          path="/supplierlist"
          element={
            <SideBarNav>
              <SupplierList />
            </SideBarNav>
          }
        />
        <Route
          path="/supplierupdate/:supplierCode"
          element={
            <SideBarNav>
              <UpdateSupplier />
            </SideBarNav>
          }
        />
         <Route
          path="/dashboard/inventory/purchase"
          element={
            <SideBarNav>
              <Purchase />
            </SideBarNav>
          }
        />
           <Route
          path=""
          element={
            <SideBarNav>
             
            </SideBarNav>
          }
        /> <Route
          path="/dashboard/inventory/createorder"
          element={
            <SideBarNav>
              <CreatePurchaseOrder />
            </SideBarNav>
          }
        />

        {/* for items sale side routes */}
        <Route
          path="/sale-side"
          element={
            <SideBar>
              <Item />
            </SideBar>
          }
        />

        {/* for payment on sale side */}

        <Route
          path="/payment-item"
          element={
            <SideBar>
              <PaymentItem />
            </SideBar>
          }
        />
        <Route
          path="/after-payment-item"
          element={
            <SideBar>
              <AfterPaymentItem />
            </SideBar>
          }
        />

        {/* for receipts on sale side */}
        <Route
          path="/receipts"
          element={
            <SideBar>
              <ReceiptsShow />
            </SideBar>
          }
        />
     
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <SideBarNav/>
    // </div>
  );
}

export default App;
