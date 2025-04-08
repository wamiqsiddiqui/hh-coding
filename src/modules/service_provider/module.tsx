import { Navigate, Route, Routes } from "react-router-dom";

// import ApplicationsWrapper from "./pages/applications/Applications";
// import CreateJob from "./pages/jobs/CreateJob";
// import CreateOffering from "./pages/offerings/CreateOffering";
// import DashboardWrapper from "./pages/dashboard/DashboardWrapper";
// import DealInformation from "./pages/deals/DealInformation";
// import DealsList from "./pages/deals/DealsList";
// import Deposit from "../core/components/payment/DepositFallback";
// import DisputeTickets from "./pages/disputeTickets";
// import EditProfile from "./pages/profile/EditProfile";
// import JobsListing from "./pages/jobs/JobsListings";
// import { MERCHANT_DEALS_ROUTES } from "../../api/merchantDeals/routes";
import { SERVICE_PROVIDER_ROUTES } from "./routes";
// import OfferingsListing from "./pages/offerings/OfferingsListings";
// import { PARENT_ROUTES } from "../../parentRoutes";
// import ProtectedRoute from "../core/components/routeWrappers/ProtectedRoute";
// import Sellers from "./pages/sellers";
// import Settings from "./pages/settings/Settings";
// import Transactions from "../core/components/payment/Transactions";
// import ViewDealMakerProfileFromMerchant from "./pages/dealMakerProfile/ViewDealMakerProfileFromMerchant";
// import ViewDisputeTicketLayout from "./components/disputeTickets/ui/view/ViewDisputeTicketLayout";
// import ViewEditJob from "./pages/jobs/EditJob";
// import ViewEditOffering from "./pages/offerings/ViewEditOffering";
// import ViewJob from "./pages/jobs/ViewJob";
// import ViewProfile from "./pages/profile/ViewProfile";
import ServiceProviderLayout from "./components/layout/ServiceProviderLayout";

const ServiceProvider = () => {
  return (
    <ServiceProviderLayout>
      <Routes>
        <Route
          path={SERVICE_PROVIDER_ROUTES.anyOther}
          element={<Navigate to={SERVICE_PROVIDER_ROUTES.notFound} />}
        />
        {/* <Route
          index
          element={<ProtectedRoute Component={DashboardWrapper} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.offering}
          element={<ProtectedRoute Component={OfferingsListing} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.offering + SERVICE_PROVIDER_ROUTES.create
          }
          element={<ProtectedRoute Component={CreateOffering} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.offering +
            SERVICE_PROVIDER_ROUTES.view +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewEditOffering} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.offering +
            SERVICE_PROVIDER_ROUTES.edit +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewEditOffering} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.job}
          element={<ProtectedRoute Component={JobsListing} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.applications + PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ApplicationsWrapper} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.job + SERVICE_PROVIDER_ROUTES.create}
          element={<ProtectedRoute Component={CreateJob} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.job +
            SERVICE_PROVIDER_ROUTES.view +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewJob} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.job +
            SERVICE_PROVIDER_ROUTES.edit +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewEditJob} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.profile}
          element={<ProtectedRoute Component={ViewProfile} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.sellers +
            "/" +
            SERVICE_PROVIDER_ROUTES.profile
          }
          element={
            <ProtectedRoute Component={ViewDealMakerProfileFromMerchant} />
          }
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.profile + SERVICE_PROVIDER_ROUTES.edit}
          element={<ProtectedRoute Component={EditProfile} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.deals}
          element={<ProtectedRoute Component={DealsList} />}
        />
        <Route
          path={MERCHANT_DEALS_ROUTES.deal + PARENT_ROUTES.idPathParameter}
          element={<ProtectedRoute Component={DealInformation} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.sellers}
          element={<ProtectedRoute Component={Sellers} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.disputeTickets}
          element={<ProtectedRoute Component={DisputeTickets} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.disputeTickets +
            SERVICE_PROVIDER_ROUTES.receivedDispute +
            SERVICE_PROVIDER_ROUTES.view +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewDisputeTicketLayout} />}
        />
        <Route
          path={
            SERVICE_PROVIDER_ROUTES.disputeTickets +
            SERVICE_PROVIDER_ROUTES.submittedDispute +
            SERVICE_PROVIDER_ROUTES.view +
            PARENT_ROUTES.idPathParameter
          }
          element={<ProtectedRoute Component={ViewDisputeTicketLayout} />}
        />
        {/* test route for payment testing */}
        {/* <Route
          path={SERVICE_PROVIDER_ROUTES.payment}
          element={<ProtectedRoute Component={Transactions} />}
        />
        <Route
          path={SERVICE_PROVIDER_ROUTES.deposit}
          element={<ProtectedRoute Component={Deposit} />}
        />

        <Route
          path={SERVICE_PROVIDER_ROUTES.settings}
          element={<ProtectedRoute Component={Settings} />}
        /> */}
      </Routes>
    </ServiceProviderLayout>
  );
};

export default ServiceProvider;
