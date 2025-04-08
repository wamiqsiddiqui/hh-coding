import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import { RootState } from "../../../../redux/store";

type PublicRouteProps = {
  Component: React.ComponentType;
};
const PublicRoute = ({ Component }: PublicRouteProps) => {
  const { isLoggedIn, accessToken } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  return (
    <>
      {isLoggedIn && accessToken ? (
        <Navigate to={PARENT_ROUTES.index} />
      ) : (
        <Component />
      )}
    </>
  );
};

export default PublicRoute;
