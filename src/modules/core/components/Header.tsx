import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import profilePicture from "../../../assets/images/profilePicture.png";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { RootState } from "../../../redux/store";
import {
  //   PermissionsEnum,
  //   ResourcesEnum,
  RoleEnum,
} from "../../../types/generalTypes";
import useRTL from "../../../utils/languageHelpers";
import { SVGLogo } from "../../../utils/svgIcons";
import { SERVICE_PROVIDER_ROUTES } from "../../service_provider/routes";
import CustomButton from "./CustomButton";
import { useLogout } from "../../../utils/hooks";
// import DealMakerHeaderImage from "./DealMakerHeaderImage";
import DetectOutsideClickWrapper from "./DetectOutsideClickWrapper";
// import MerchantHeaderImage from "./MerchantHeaderImage";
// import MobileNavMenu from "./MobileNavMenu";
// import NotificationBox from "./notifications/NotificationBox";
// import WalletDisplay from "./wallet/WalletDisplay";

const Header = () => {
  //   const location = useLocation();
  const { t } = useTranslation();
  const {
    isLoggedIn,
    accessToken,
    role,
    // user,
    // permissions,
    language: lang,
  } = useSelector((state: RootState) => state.centeralizedStateData.user);
  //   const _menuItemsMerchantRep = useMemo(() => {
  //     const resourceToMenuMap: {
  //       [key in ResourcesEnum]?: { name: string; link: string; active?: boolean };
  //     } = {
  //       [ResourcesEnum.OFFERINGS]: {
  //         name: t("offerings"),
  //         link: SERVICE_PROVIDER_ROUTES.resetMerchant,
  //         active: false,
  //       },
  //       [ResourcesEnum.JOBS]: {
  //         name: t("jobs"),
  //         link: SERVICE_PROVIDER_ROUTES.resetJob,
  //       },
  //       [ResourcesEnum.DEALS]: {
  //         name: t("deals"),
  //         link: SERVICE_PROVIDER_ROUTES.resetDeals,
  //       },
  //       [ResourcesEnum.SELLERS]: {
  //         name: t("sellers"),
  //         link: SERVICE_PROVIDER_ROUTES.resetSellers,
  //       },
  //     };

  //     return [
  //       { name: t("dashboard"), link: PARENT_ROUTES.merchant, active: true },
  //       ...Object.entries(resourceToMenuMap)
  //         .filter(
  //           ([key]) =>
  //             permissions &&
  //             Object.keys(permissions).includes(key) &&
  //             permissions[key].includes(PermissionsEnum.View)
  //         ) // Check if 'view' permission exists
  //         .map(([, menuItem]) => ({ ...menuItem, active: false })),
  //     ]; // Map to menu items
  //   }, [permissions, t]);

  //   const [menuItemsMerchantRep, setMenuItemsMerchantRep] = useState(
  //     _menuItemsMerchantRep
  //   );
  //   const _menuItemsMerchant = useMemo(
  //     () => [
  //       { name: t("dashboard"), link: "/merchant", active: true },
  //       {
  //         name: t("offerings"),
  //         link: SERVICE_PROVIDER_ROUTES.resetMerchant,
  //         active: false,
  //       },
  //       {
  //         name: t("jobs"),
  //         link: SERVICE_PROVIDER_ROUTES.resetJob,
  //         active: false,
  //       },
  //       {
  //         name: t("deals"),
  //         link: SERVICE_PROVIDER_ROUTES.resetDeals,
  //         active: false,
  //       },
  //       {
  //         name: t("sellers"),
  //         link: SERVICE_PROVIDER_ROUTES.resetSellers,
  //         active: false,
  //       },
  //     ],
  //     [t]
  //   );
  //   const _menuItemsDealMaker = useMemo(
  //     () => [
  //       { name: "Home", link: PARENT_ROUTES.deal_maker, active: true },
  //       {
  //         name: "Jobs",
  //         link: PARENT_ROUTES.deal_maker + "/" + DEALMAKER_ROUTES.jobs,
  //         active: false,
  //       },
  //       {
  //         name: "Deals",
  //         link: PARENT_ROUTES.deal_maker + "/" + DEALMAKER_ROUTES.deals,
  //         active: false,
  //       },
  //     ],
  //     []
  //   );
  //   const [menuItemsMerchant, setMenuItemsMerchant] =
  //     useState(_menuItemsMerchant);
  //   const [menuItemsDealMaker, setMenuItemsDealMaker] =
  //     useState(_menuItemsDealMaker);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { handleLangChange } = useRTL();

  //   const setActiveMenuItem = useCallback(() => {
  //     const setActive = (
  //       menuItems: typeof menuItemsMerchant | typeof menuItemsDealMaker
  //     ) => {
  //       return menuItems.map((item) => {
  //         if (item.link === location.pathname) {
  //           return {
  //             ...item,
  //             active: true,
  //           };
  //         } else {
  //           return {
  //             ...item,
  //             active: false,
  //           };
  //         }
  //       });
  //     };

  //     if (role === RoleEnum.MERCHANT) {
  //       const updateMenuItems = setActive(_menuItemsMerchant);
  //       setMenuItemsMerchant(updateMenuItems);
  //     } else if (role === RoleEnum.SELLER) {
  //       const updateMenuItems = setActive(_menuItemsDealMaker);
  //       setMenuItemsDealMaker(updateMenuItems);
  //     } else if (role === RoleEnum.MERCHANT_REPRESENTATIVE) {
  //       const updateMenuItems = setActive(_menuItemsMerchantRep);
  //       setMenuItemsMerchantRep(updateMenuItems);
  //     } else {
  //       <></>;
  //     }
  //   }, [
  //     location.pathname,
  //     _menuItemsDealMaker,
  //     _menuItemsMerchant,
  //     _menuItemsMerchantRep,
  //     role,
  //   ]);

  //   useEffect(() => {
  //     setActiveMenuItem();
  //   }, [location.pathname, setActiveMenuItem]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  //   const handleNavigateInAppCredits = () => {
  //     const parentRoute =
  //       role === RoleEnum.MERCHANT || role === RoleEnum.MERCHANT_REPRESENTATIVE
  //         ? PARENT_ROUTES.merchant
  //         : PARENT_ROUTES.deal_maker;
  //     navigate(
  //       role === RoleEnum.MERCHANT_REPRESENTATIVE
  //         ? parentRoute + "/" + MERCHANT_ROUTES.profile
  //         : parentRoute + "/" + MERCHANT_ROUTES.profile + MERCHANT_ROUTES.edit,
  //       { state: { tab: role === RoleEnum.MERCHANT ? 6 : 5 } }
  //     );
  //   };

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

  //   const mapMenuItems = (
  //     menuItems:
  //       | typeof menuItemsMerchant
  //       | typeof menuItemsDealMaker
  //       | typeof _menuItemsMerchantRep
  //   ) => {
  //     return menuItems.map((item, _index) => (
  //       <div
  //         key={_index}
  //         onClick={() => {
  //           navigate(item.link);
  //         }}
  //         className="flex flex-col w-fit mr-5 cursor-pointer"
  //       >
  //         <p
  //           className={`flex-[3] py-5 ${
  //             item.active ? "text-secondary-green" : "text-grayShades-customGray"
  //           }`}
  //         >
  //           {item.name}
  //         </p>
  //         <div
  //           className={`${
  //             item.active ? "w-full" : "w-0"
  //           } transition-[width] h-[2px] bg-secondary-green`}
  //         ></div>
  //       </div>
  //     ));
  //   };
  //   const getNavItems = () => {
  //     if (role === RoleEnum.MERCHANT) {
  //       return mapMenuItems(menuItemsMerchant);
  //     } else if (role === RoleEnum.SELLER) {
  //       const items = mapMenuItems(menuItemsDealMaker);
  //       return items;
  //     } else if (role === RoleEnum.MERCHANT_REPRESENTATIVE) {
  //       return mapMenuItems(menuItemsMerchantRep);
  //     } else {
  //       return <></>;
  //     }
  //   };
  return (
    <header
      className={`sticky z-50 h-16 flex justify-between border-b-custom-green border-b-[1px] ${
        window.location.pathname === "/service-provider/portal/login"
          ? "items-center pl-5"
          : `bg-white items-center top-0 left-0 right-0 px-5 animate-dropdown duration-150 transition-all`
      }`}
    >
      <SVGLogo
        className=" cursor-pointer"
        onClick={() =>
          navigate(
            role === RoleEnum.MERCHANT
              ? PARENT_ROUTES.merchant
              : PARENT_ROUTES.deal_maker
          )
        }
      />

      <div className="flex items-center justify-end">
        {/* Desktop Nav Items start */}
        {isLoggedIn &&
          accessToken &&
          (role === RoleEnum.MERCHANT ||
            role === RoleEnum.SELLER ||
            role === RoleEnum.MERCHANT_REPRESENTATIVE) && (
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
                {/* <div className="hidden sm:flex sm:items-center sm:mx-4 lg:mx-0">
                  {isLoggedIn && accessToken && (
                    <WalletDisplay onClick={handleNavigateInAppCredits} />
                  )}
                </div> */}
                {/* {isLoggedIn && accessToken && <NotificationBox />} */}
                <div className="lg:flex hidden gap-x-4 mr-4">
                  <DetectOutsideClickWrapper onClick={() => setExpanded(false)}>
                    <div className="relative flex items-center gap-x-2">
                      {/* {role === RoleEnum.MERCHANT ? (
                        <MerchantHeaderImage
                          isExpanded={isExpanded}
                          setExpanded={setExpanded}
                          stateUserName={user?.name ?? ""}
                        />
                      ) : (
                        <DealMakerHeaderImage
                          isExpanded={isExpanded}
                          setExpanded={setExpanded}
                          stateUserName={user?.name ?? ""}
                        />
                      )} */}
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
                              const parentRoute =
                                role === RoleEnum.MERCHANT ||
                                role === RoleEnum.MERCHANT_REPRESENTATIVE
                                  ? PARENT_ROUTES.merchant
                                  : PARENT_ROUTES.deal_maker;
                              navigate(
                                role === RoleEnum.MERCHANT_REPRESENTATIVE
                                  ? parentRoute +
                                      "/" +
                                      SERVICE_PROVIDER_ROUTES.profile
                                  : parentRoute +
                                      "/" +
                                      SERVICE_PROVIDER_ROUTES.profile +
                                      SERVICE_PROVIDER_ROUTES.edit
                              );
                            }}
                            variant="text"
                            textVariant="gray"
                          />
                          {role !== RoleEnum.MERCHANT_REPRESENTATIVE && (
                            <CustomButton
                              text={t("disputes")}
                              width="w-full"
                              onClick={() => {
                                setExpanded(false);
                                const parentRoute =
                                  role === RoleEnum.MERCHANT
                                    ? PARENT_ROUTES.merchant
                                    : PARENT_ROUTES.deal_maker;
                                navigate(
                                  parentRoute +
                                    SERVICE_PROVIDER_ROUTES.disputeTickets
                                );
                              }}
                              variant="text"
                              textVariant="gray"
                            />
                          )}
                          {/* Don't have settings for Dealmaker currently hence disabled for dealmaker */}
                          {role === RoleEnum.MERCHANT && (
                            <CustomButton
                              text={t("settings")}
                              width="w-full"
                              onClick={() => {
                                setExpanded(false);
                                const parentRoute =
                                  role === RoleEnum.MERCHANT ||
                                  role === RoleEnum.MERCHANT_REPRESENTATIVE
                                    ? PARENT_ROUTES.merchant
                                    : PARENT_ROUTES.deal_maker;
                                navigate(
                                  parentRoute + SERVICE_PROVIDER_ROUTES.settings
                                );
                              }}
                              variant="text"
                              textVariant="gray"
                            />
                          )}
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

        {/* Mobile Nav Items start */}
        {/* {isLoggedIn &&
          accessToken &&
          (role === RoleEnum.MERCHANT || role === RoleEnum.SELLER) && (
            <MobileNavMenu
              role={role}
              profilePicture={profilePicture}
              logout={logout}
              menuItemsDealMaker={menuItemsDealMaker}
              menuItemsMerchant={menuItemsMerchant}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              handleNavigateInAppCredits={handleNavigateInAppCredits}
            />
          )} */}
        {/* Mobile Nav Items end*/}
      </div>
    </header>
  );
};

export default Header;
