import { JSX, Suspense, lazy, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Happy_Hour_Logo from "./assets/images/Happy_Hour_Logo.png";
import ComingSoon from "./modules/core/components/ComingSoon";
import PublicRoute from "./modules/core/components/routeWrappers/PublicRoute";
import CoreLayout from "./modules/core/layoutComponents/CoreLayout";
import ForgotPassword from "./modules/core/pages/ForgotPassword";
import Login from "./modules/core/pages/Login";
import NotFound from "./modules/core/pages/NotFound";
import Signup from "./modules/core/pages/Signup";
import { PARENT_ROUTES } from "./parentRoutes";
import { updateAccessToken } from "./redux/auth";
import { RootState } from "./redux/store";
import { RoleEnum } from "./types/generalTypes";
import { KEY_NAMES } from "./utils/constants";
import { useHandleTokenExpiration } from "./utils/helpers";
import { useAutoLogout } from "./utils/IdleTimer/useAutoLogout";
import Toast from "./modules/core/components/Toast";
import i18n from "./i18n/config";

const queryClient = new QueryClient({});

const ServiceProvider = lazy(() => import("./modules/service_provider/module"));

const Loading = () => (
  <div className="w-screen h-[calc(100vh-64px)] flex justify-center items-start mt-60 animate-pulse">
    <img src={Happy_Hour_Logo} alt="Loading..." className="w-72" />;
  </div>
);
const LoadModule = ({ module }: { module: JSX.Element }) => (
  <Suspense fallback={<Loading />}>{module}</Suspense>
);
function App() {
  const dispatch = useDispatch();
  const [exp, setExp] = useState(false);
  const handleRefreshToken = useHandleTokenExpiration(exp, setExp);
  //! automatically logs out after 1 hour of inactivity
  useAutoLogout(60 * 60 * 1000);

  const { language, isLoggedIn, role, expiresIn } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );

  const { text } = useSelector(
    (state: RootState) => state.centeralizedStateData.toast
  );
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        handleRefreshToken();
      }, (expiresIn - 300) * 1000); // expiresIn is in seconds --- so 300 seconds =  5 minutes to convert into milliseconds * 10000
    }
  }, [expiresIn, exp, handleRefreshToken, isLoggedIn]);

  useEffect(() => {
    // ! this useEffect is used to check for changes in accessToken
    const storedToken = localStorage.getItem(KEY_NAMES.accessToken);
    if (storedToken) {
      dispatch(updateAccessToken(storedToken));
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === KEY_NAMES.accessToken) {
        //! clean out redux accessToken so that the user gets thrown back to sign in page
        dispatch(updateAccessToken(""));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("i18nextLng", language ?? "en");
  }, [language]);
  useEffect(() => {
    const handleI18nReady = () => {
      const lang = i18n.language;
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    };

    if (i18n.isInitialized) {
      handleI18nReady();
    } else {
      i18n.on("initialized", handleI18nReady);
    }

    return () => {
      i18n.off("initialized", handleI18nReady);
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <CoreLayout>
          <Routes>
            <Route
              path={PARENT_ROUTES.all}
              element={<Navigate to={PARENT_ROUTES.notFound} />}
            />
            <Route path={PARENT_ROUTES.notFound} element={<NotFound />} />
            <Route
              path={PARENT_ROUTES.index}
              element={
                role === RoleEnum.SERVICE_PROVIDER ? (
                  <Navigate to={PARENT_ROUTES.serviceProvider} />
                ) : (
                  <Navigate to={PARENT_ROUTES.login} />
                )
              }
            />
            <Route
              path={PARENT_ROUTES.login}
              element={<PublicRoute Component={Login} />}
            />
            <Route
              path={PARENT_ROUTES.signup}
              element={<PublicRoute Component={Signup} />}
            />
            <Route
              path={PARENT_ROUTES.forgotPassword}
              element={<PublicRoute Component={ForgotPassword} />}
            />
            <Route
              path={`${PARENT_ROUTES.serviceProvider}/*`}
              element={<LoadModule module={<ServiceProvider />} />}
            />
            {/* <Route
              path={PARENT_ROUTES.handshake}
              element={<PublicRoute Component={Handshake} />}
            /> */}
            <Route
              path={PARENT_ROUTES.commingSoon}
              element={<PublicRoute Component={ComingSoon} />}
            />
          </Routes>
          {text && <Toast />}
        </CoreLayout>
      </div>
    </QueryClientProvider>
  );
}

export default App;
