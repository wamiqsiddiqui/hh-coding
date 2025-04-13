import { useTranslation } from "react-i18next";
import { useLogout } from "../../../utils/hooks";
import { HappyHourLogoSvg } from "../../../utils/svgIcons";
import CustomButton from "./CustomButton";
import CustomChip from "./CustomChip";

const ComingSoon = () => {
  const logout = useLogout();
  const { t } = useTranslation();
  return (
    <div
      className={`bg-tertiary-color h-[calc(100vh-64px)] text-custom-black flex flex-col items-center justify-center`}
    >
      <div className="w-full flex items-center gap-y-4 mb-4 flex-col justify-center">
        <HappyHourLogoSvg width="157.59" height="76.57" />
        <CustomChip text={t("serviceProvider")} />
      </div>
      <h1 className="text-5xl text-custom-green font-bold mb-8 animate-pulse">
        {t("comingSoon")}
      </h1>
      <p className="text-custom-black text-lg mb-8 font-semibold">
        {t("weAreWorkingHardStayTuned")}
      </p>
      <CustomButton text={t("logout")} onClick={() => logout()} />
    </div>
  );
};

export default ComingSoon;
