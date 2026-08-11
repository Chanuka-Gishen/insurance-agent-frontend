import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import CreateCustomerPage from "../pages/CreateCustomerPage";
import CustomersPage from "../pages/CustomersPage";
import DashboardPage from "../pages/DashboardPage";
import FollowUpsPage from "../pages/FollowUpsPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import CustomerDetailsPage from "../pages/CustomerDetailsPage";
import EditCustomerPage from "../pages/EditCustomerPage";
import CreateInsurancePage from "../pages/CreateInsurancePage";

import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../components/layout/ScrollToTop";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />

            <Route path="customers" element={<CustomersPage />} />

            <Route path="customers/create" element={<CreateCustomerPage />} />

            <Route path="customers/:id/edit" element={<EditCustomerPage />} />

            <Route path="customers/:id" element={<CustomerDetailsPage />} />

            <Route
              path="customers/:customerId/insurances/create"
              element={<CreateInsurancePage />}
            />

            <Route
              path="customers/:customerId/insurances/:insuranceId"
              element={<div>Insurance Details</div>}
            />

            <Route path="follow-ups" element={<FollowUpsPage />} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
