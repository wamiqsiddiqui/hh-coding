import { useNavigate } from "react-router-dom";
import {
  DiscountSvg,
  ErrorOutlineSvg,
  GridSvg,
  HappyHourLogoSvg,
  HelpCenterSvg,
  HomeSvg,
  LogoutSvg,
  NotificationsSvg,
  ProfileSvg,
} from "../../../utils/svgIcons";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { useLogout } from "../../../utils/hooks";
import { ADMIN_ROUTES } from "../../superAdmin/routes";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";
import { setSidebarOpen } from "../../../redux/sidebarSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const language = useSelector(
    (state: RootState) => state.centeralizedStateData.user.language
  );
  const isSidebarOpen = useSelector(
    (state: RootState) => state.centeralizedStateData.sidebar.isSidebarOpen
  );

  const items = [
    {
      name: t("profile"),
      icon: <ProfileSvg />,
      link: PARENT_ROUTES.superAdmin,
    },
    {
      name: t("dashboard"),
      icon: <HomeSvg />,
      link: "",
    },
    {
      name: t("pendingApprovals"),
      icon: <ErrorOutlineSvg />,
      link: ADMIN_ROUTES.pendingApprovals,
    },
    {
      name: t("subAdmins"),
      icon: <GridSvg />,
      link: ADMIN_ROUTES.notFound,
    },
    {
      name: t("approveVouchers"),
      icon: <DiscountSvg />,
      link: "",
    },
    {
      name: t("notifications"),
      icon: <NotificationsSvg />,
      link: "",
    },
    {
      name: t("helpCenter"),
      icon: <HelpCenterSvg />,
      link: "",
    },
  ];
  const logout = useLogout();
  const dispatch = useDispatch();
  return (
    <DetectOutsideClickWrapper
      onClick={() => {
        dispatch(setSidebarOpen({ isSidebarOpen: false }));
      }}
    >
      <div
        className={`w-72 z-50 ${
          isSidebarOpen ? "max-md:w-72" : "max-md:w-0"
        } max-md:top-40 absolute ${
          language === "en" ? "left-0" : "right-0"
        } transition-[width] overflow-hidden bottom-0 h-screen max-md:h-[calc(100vh-160px)] bg-white flex flex-col items-center justify-start py-8 border-r border-gray-200`}
      >
        <HappyHourLogoSvg
          width="116"
          height="56"
          className="cursor-pointer"
          onClick={() => {
            navigate(PARENT_ROUTES.superAdmin);
          }}
        />
        <div className="relative w-full h-full overflow-y-auto bg-white flex flex-col items-center justify-between">
          <div className="flex flex-col w-full justify-start items-center">
            <nav className="flex flex-col w-full mt-4 max-md:mt-0 pb-4 max-md:py-0">
              {items.map((item) => {
                return (
                  <div
                    onClick={() => {
                      navigate(item.link);
                      dispatch(setSidebarOpen({ isSidebarOpen: false }));
                    }}
                    className={`flex gap-x-3 group cursor-pointer w-full ${
                      language === "en" ? "pl-8" : "pr-8"
                    } py-5 justify-start items-center hover:bg-primary-color bg-white text-hhGrayShades-tabHeader hover:text-white`}
                  >
                    {item.icon}
                    <p className="text-lg font-semibold text-start">
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </nav>
          </div>
          <div
            onClick={() => {
              logout();
              dispatch(setSidebarOpen({ isSidebarOpen: false }));
            }}
            className={`flex  max-md:relative gap-x-3 group cursor-pointer w-full ${
              language === "en" ? "pl-8" : "pr-8"
            } py-5 justify-start items-center hover:bg-primary-color bg-white text-hhGrayShades-tabHeader hover:text-white`}
          >
            <LogoutSvg />
            <p className="text-lg font-semibold text-start">{t("logout")}</p>
          </div>
        </div>
      </div>
    </DetectOutsideClickWrapper>
  );
};

export default Sidebar;
