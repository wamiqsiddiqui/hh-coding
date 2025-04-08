import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../../redux/store";
import { PARENT_ROUTES } from "../../../../parentRoutes";

type ProtectedRouteProps = {
  Component: React.ComponentType;
};
const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const { isLoggedIn, accessToken } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  return (
    <div>
      {isLoggedIn && accessToken ? (
        <Component />
      ) : (
        <Navigate to={PARENT_ROUTES.login} />
      )}
    </div>
  );
};

export default ProtectedRoute;
