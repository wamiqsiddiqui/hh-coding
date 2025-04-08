import { useSelector } from "react-redux";
import { EnglishFlagSvg, HappyHourLogoSvg } from "../../../utils/svgIcons";
import DropdownSelectOnly from "./DropdownSelectOnly";
import { RootState } from "../../../redux/store";
import useRTL from "../../../utils/languageHelpers";
import { useTranslation } from "react-i18next";

const SubHeader = () => {
  const { t } = useTranslation();
  const { language: lang } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  const { handleLangChange } = useRTL();
  return (
    <div className="flex w-full justify-between mt-4 px-4">
      <HappyHourLogoSvg />
      <DropdownSelectOnly
        onSelect={() => {
          handleLangChange();
        }}
        selectedLabel={lang === "ar" ? t("arabic") : t("english")}
        options={[
          lang === "ar"
            ? { label: t("english"), value: "en", img: <EnglishFlagSvg /> }
            : { label: t("arabic"), value: "ar", img: <EnglishFlagSvg /> },
        ]}
        img={<EnglishFlagSvg />}
      />
    </div>
  );
};

export default SubHeader;
