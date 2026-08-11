import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import CreateCustomerPage from "../pages/CreateCustomerPage";
import CustomersPage from "../pages/CustomersPage";
import DashboardPage from "../pages/DashboardPage";
import RenewalsPage from "../pages/RenewalsPage";
import LoginPage from "../pages/LoginPage";
import SettingsPage from "../pages/SettingsPage";
import CustomerDetailsPage from "../pages/CustomerDetailsPage";
import EditCustomerPage from "../pages/EditCustomerPage";
import CreateInsurancePage from "../pages/CreateInsurancePage";
import InsuranceDetailsPage from "../pages/InsuranceDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import ScrollToTop from "../components/layout/ScrollToTop";
import EditInsurancePage from "../pages/EditInsurancePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

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
              element={<InsuranceDetailsPage />}
            />

            <Route
              path="customers/:customerId/insurances/:insuranceId/edit"
              element={<EditInsurancePage />}
            />

            <Route path="renewals" element={<RenewalsPage />} />

            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
