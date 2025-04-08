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
};
const SubHeader = ({ noPadding }: SubHeaderProps) => {
  const { t } = useTranslation();
  const { language: lang } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  const { handleLangChange } = useRTL();
  return (
    <div
      className={`flex w-full ${
        !noPadding ? "px-4 justify-between mt-4" : "justify-end mb-4"
      }`}
    >
      {!noPadding && <HappyHourLogoSvg />}
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
