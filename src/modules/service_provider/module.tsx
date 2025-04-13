import { Navigate, Route, Routes } from "react-router-dom";
import { SERVICE_PROVIDER_ROUTES } from "./routes";
import ServiceProviderLayout from "./components/layout/ServiceProviderLayout";
import ProtectedRoute from "../core/components/routeWrappers/ProtectedRoute";
import ComingSoon from "../core/components/ComingSoon";

const ServiceProvider = () => {
  return (
    <ServiceProviderLayout>
      <Routes>
        <Route
          path={SERVICE_PROVIDER_ROUTES.anyOther}
          element={<Navigate to={SERVICE_PROVIDER_ROUTES.notFound} />}
        />
        <Route index element={<ProtectedRoute Component={ComingSoon} />} />
      </Routes>
    </ServiceProviderLayout>
  );
};

export default ServiceProvider;
