import { useSelector } from "react-redux";
import {
  ArabicFlagSvg,
  EnglishFlagSvg,
  HappyHourLogoSvg,
} from "../../../utils/svgIcons";
import DropdownSelectOnly from "./DropdownSelectOnly";
import { RootState } from "../../../redux/store";
import useRTL from "../../../utils/languageHelpers";
import { useTranslation } from "react-i18next";

type SubHeaderProps = {
  noPadding?: boolean;
  noLogo?: boolean;
};
const SubHeader = ({ noPadding, noLogo }: SubHeaderProps) => {
  const { t } = useTranslation();
  const { language: lang } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  const { handleLangChange } = useRTL();
  return (
    <div
      className={`flex w-full ${!noLogo ? "justify-between" : "justify-end"} ${
        !noPadding ? "px-4 mt-4" : "mb-4"
      }`}
    >
      {!noLogo && <HappyHourLogoSvg />}
      <DropdownSelectOnly
        onSelect={() => {
          handleLangChange();
        }}
        selectedLabel={lang === "ar" ? t("arabic") : t("english")}
        options={[
          lang === "ar"
            ? { label: t("english"), value: "en", img: <EnglishFlagSvg /> }
            : { label: t("arabic"), value: "ar", img: <ArabicFlagSvg /> },
        ]}
        img={lang === "ar" ? <ArabicFlagSvg /> : <EnglishFlagSvg />}
      />
    </div>
  );
};

export default SubHeader;
