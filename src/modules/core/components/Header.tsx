import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useRTL from "../../../utils/languageHelpers";
import DropdownSelectOnly from "./DropdownSelectOnly";
import { ArabicFlagSvg, EnglishFlagSvg } from "../../../utils/svgIcons";
import { useTranslation } from "react-i18next";
import { ADMIN_ROUTES } from "../../superAdmin/routes";
import { useLocation } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import IconButton from "./IconButton";
// import { setSidebarOpen } from "../../../redux/sidebarSlice";
import { TiThMenu } from "react-icons/ti";

const Header = ({
  setSidebarOpen,
  isSidebarOpen,
  toggleButtonRef,
}: {
  toggleButtonRef: RefObject<HTMLDivElement | null>;
  isSidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { language: lang } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleLangChange } = useRTL();
  const { t } = useTranslation();
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  const sidebarItems = useMemo(
    () => [
      {
        link: ADMIN_ROUTES.dashboard,
        headerTitle: "dashboard",
        headerDescription: "youCanVewYourStatisticsHere",
      },
      {
        link: ADMIN_ROUTES.pendingApprovals,
        headerTitle: "serviceProviders",
        headerDescription: "youCanViewAllServiceProvidersHere",
      },
      {
        link: ADMIN_ROUTES.subAdmins,
        headerTitle: "serviceProviders",
        headerDescription: "youCanVewAndAddSubAdminsHere",
      },
      {
        link: ADMIN_ROUTES.approveVouchers,
        headerTitle: "approveVouchers",
        headerDescription: "youCanApproveVouchersHere",
      },
      {
        link: ADMIN_ROUTES.notifications,
        headerTitle: "notifications",
        headerDescription: "youCanViewNotificationsHere",
      },
      {
        link: ADMIN_ROUTES.helpCenter,
        headerTitle: "helpCenter",
        headerDescription: "youCanContactHelpCenterFromHere",
      },
      {
        link: PARENT_ROUTES.superAdmin,
        headerTitle: "profile",
        headerDescription: "youCanVewYourProfileHere",
      },
    ],
    []
  );
  const location = useLocation();
  const getTitleDescription = useCallback(() => {
    const text = sidebarItems.find((item) => {
      return location.pathname.includes(item.link);
    });

    return {
      headerTitle: text?.headerTitle ?? "why",
      headerDescription: text?.headerDescription ?? "what",
    };
  }, [location.pathname, sidebarItems]);

  return (
    <header
      className={`sticky z-50 h-40 flex justify-between border-b-primary-color border-b-[1px] bg-primary-color items-center top-0 left-0 right-0 px-5 animate-dropdown duration-150 transition-all `}
    >
      <div
        className={`absolute top-2 max-md:block hidden ${
          lang === "en" ? "left-2" : "right-2"
        }`}
      >
        <IconButton
          toggleButtonRef={toggleButtonRef}
          icon={<TiThMenu color="#FFF" size={25} />}
          onClick={() => {
            setSidebarOpen(!isSidebarOpen);
          }}
        />
      </div>
      <div className="flex w-full px-4 justify-between items-start">
        <div className="flex flex-col gap-y-2">
          <p className="text-white text-start text-3xl font-bold">
            {t(getTitleDescription().headerTitle)}
          </p>
          <p className="text-white text-start text-base font-medium">
            {t(getTitleDescription().headerDescription)}
          </p>
        </div>
        <DropdownSelectOnly
          onSelect={() => {
            handleLangChange();
          }}
          selectedLabel={lang === "ar" ? t("arabic") : t("english")}
          options={[
            lang === "ar"
              ? {
                  label: t("english"),
                  value: "en",
                  img: <EnglishFlagSvg />,
                }
              : {
                  label: t("arabic"),
                  value: "ar",
                  img: <ArabicFlagSvg />,
                },
          ]}
          img={lang === "ar" ? <ArabicFlagSvg /> : <EnglishFlagSvg />}
        />
      </div>
    </header>
  );
};

export default Header;
