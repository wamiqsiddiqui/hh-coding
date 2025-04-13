import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { RootState } from "../../../redux/store";
import { RoleEnum } from "../../../types/generalTypes";
import useRTL from "../../../utils/languageHelpers";
import { SERVICE_PROVIDER_ROUTES } from "../../service_provider/routes";
import CustomButton from "./CustomButton";
import { useLogout } from "../../../utils/hooks";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";

const Header = () => {
  const { t } = useTranslation();
  const {
    isLoggedIn,
    accessToken,
    role,
    language: lang,
  } = useSelector((state: RootState) => state.centeralizedStateData.user);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { handleLangChange } = useRTL();

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

  return (
    <header
      className={`sticky z-50 h-16 flex justify-between border-b-custom-green border-b-[1px] ${
        window.location.pathname === "/service-provider/portal/login"
          ? "items-center pl-5"
          : `bg-custom-green items-center top-0 left-0 right-0 px-5 animate-dropdown duration-150 transition-all`
      }`}
    >
      <div className="flex items-center justify-end">
        {/* Desktop Nav Items start */}
        {isLoggedIn && accessToken && role === RoleEnum.SERVICE_PROVIDER && (
          <div className="flex max-md:justify-end sm:justify-end lg:justify-between items-center md:w-[calc(100vw-200px)]">
            {/*First half of nav start  */}
            <div className="lg:flex hidden h-full">{/*getNavItems()*/}</div>
            {/*First half of nav end  */}

            {/*Second half of nav start  */}
            <div className="flex justify-start items-center">
              <div className="hidden" onClick={() => handleLangChange()}>
                <div onClick={handleLangChange}>
                  {lang === "en" ? (
                    <div>
                      <button className="bg-white text-text-black hover:font-semibold">
                        AR
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button className="bg-white text-text-black hover:font-semibold">
                        EN
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:flex hidden gap-x-4 mr-4">
                <DetectOutsideClickWrapper onClick={() => setExpanded(false)}>
                  <div className="relative flex items-center gap-x-2">
                    {
                      <div
                        className={`${
                          isExpanded ? "scale-100 origin-top" : "scale-0"
                        } absolute top-16 transition-all rounded-lg w-full px-2 py-2 bg-white`}
                      >
                        <CustomButton
                          text={t("profile")}
                          width="w-full"
                          onClick={() => {
                            setExpanded(false);
                            const parentRoute = PARENT_ROUTES.serviceProvider;

                            navigate(
                              parentRoute +
                                "/" +
                                SERVICE_PROVIDER_ROUTES.profile +
                                SERVICE_PROVIDER_ROUTES.edit
                            );
                          }}
                          variant="text"
                          textVariant="gray"
                        />
                        <CustomButton
                          text={t("logout")}
                          width="w-full"
                          onClick={() => {
                            setExpanded(false);
                            logout();
                          }}
                          variant="text"
                          textVariant="red"
                        />
                      </div>
                    }
                  </div>
                </DetectOutsideClickWrapper>
              </div>
            </div>
            {/*Second half of nav end  */}
          </div>
        )}
        {/* Desktop Nav Items end */}
      </div>
    </header>
  );
};

export default Header;
