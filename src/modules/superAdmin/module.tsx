import { Navigate, Route, Routes } from "react-router-dom";
import { ADMIN_ROUTES } from "./routes";
import ServiceProviderLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "../core/components/routeWrappers/ProtectedRoute";
import ComingSoon from "../core/components/ComingSoon";
import PendingApprovalsPage from "./pages/pendingApprovals";
import ViewPendingApprovalsPage from "./pages/viewPendingApprovals";

const ServiceProvider = () => {
  return (
    <ServiceProviderLayout>
      <Routes>
        <Route
          path={ADMIN_ROUTES.anyOther}
          element={<Navigate to={ADMIN_ROUTES.notFound} />}
        />
        <Route index element={<ProtectedRoute Component={ComingSoon} />} />
        <Route
          path={ADMIN_ROUTES.pendingApprovals}
          element={<ProtectedRoute Component={PendingApprovalsPage} />}
        />
        <Route
          path={ADMIN_ROUTES.pendingApprovals + "/" + ADMIN_ROUTES.view}
          element={<ProtectedRoute Component={ViewPendingApprovalsPage} />}
        />
      </Routes>
    </ServiceProviderLayout>
  );
};

export default ServiceProvider;
