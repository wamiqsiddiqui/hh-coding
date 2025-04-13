import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupFormType,
} from "../../../../types/signupTypes";
import CustomButton from "../CustomButton";
import { EmailField, PhoneNumberField, StringField } from "../FormFields";
import DropdownInputField from "../DropdownInputField";
import CustomSearchGooglePlaces from "../CustomSearchGooglePlaces";
import { useGetAllBusinessCategories } from "../../../../api/general/reactQueryHooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useTranslation } from "react-i18next";
import { ArabicFlagSvg } from "../../../../utils/svgIcons";

type BusinessInformationProps = {
  fieldNames: SignupFieldNames[];
  setSelectedSection: Dispatch<SetStateAction<number>>;
  type: string;
  isPending: boolean;
  selectedSection: number;
  email?: string;
  checkError: boolean;
  setCheckError?: Dispatch<SetStateAction<boolean>>;
};
const BusinessInformation = ({
  setSelectedSection,
  fieldNames,
  selectedSection,
}: BusinessInformationProps) => {
  const navigate = useNavigate();
  const { data: businessCategories } = useGetAllBusinessCategories();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);
  const { setFieldTouched, validateField, touched, values } =
    useFormikContext<SignupFormType>();
  const [helperText, setHelperText] = useState("");

  const onNextClick = () => {
    if (values.address.length === 0) {
      setHelperText(t("pleaseEnterLocation"));
    }
    fieldNames.forEach((field) => setFieldTouched(field, true));
    let errorCount = 0;
    fieldNames.forEach(async (field, index) => {
      await setFieldTouched(field);
      validateField(field).then((error) => {
        if (error) {
          errorCount++;
        }
        if (
          index === fieldNames.length - 1 &&
          errorCount === 0 &&
          values.address.length > 0
        ) {
          setHelperText("");
          setSelectedSection(1);
        }
      });
    });
  };
  const { language } = useSelector(
    (state: RootState) => state.centeralizedStateData.user
  );
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (helperText.length > 0) {
      setHelperText(t("pleaseEnterLocation"));
    }
  }, [t, i18n, helperText.length]);
  return (
    <>
      <div className="overflow-x-hidden flex flex-col items-center pb-10 px-10">
        <div className="grid gap-x-4 md:grid-cols-2 max-md:grid-cols-1 w-full">
          <StringField
            label={t("businessNameInEnglish")}
            fullWidth
            fieldName={SignupFieldNames.businessNameEn}
          />
          <StringField
            label={t("businessNameInArabic")}
            fullWidth
            isArabic
            fieldName={SignupFieldNames.businessNameAr}
          />
          <StringField
            label={t("managerName")}
            fullWidth
            fieldName={SignupFieldNames.managerName}
          />
          {businessCategories && (
            <DropdownInputField
              label={t("businessCategory")}
              fieldName={SignupFieldNames.businessCategory}
              fullWidth
              isOptional={false}
              options={[
                { name: t("SelectBusinessCategory"), id: "" },
                ...businessCategories.data.data.map((category) => {
                  return {
                    name:
                      language === "en" ? category.labelEn : category.labelAr,
                    id: category.value,
                  };
                }),
              ]}
            />
          )}
          <PhoneNumberField
            label={t("contactNumber")}
            fullWidth
            placeholder="5XXXXXXXX"
            prefix={
              <div className="flex items-center gap-x-1 w-max">
                <ArabicFlagSvg />
                <p className="text-xs text-hhGrayShades-textGray">+966 |</p>
              </div>
            }
            fieldName={SignupFieldNames.phoneNo}
          />
          <EmailField
            fullWidth
            label={t("emailAddress")}
            fieldName={SignupFieldNames.emailAddress}
          />
          <CustomSearchGooglePlaces
            touched={touched}
            values={values}
            helperText={helperText}
            setHelperText={setHelperText}
          />
          <StringField
            label={t("boxBuildingNumber")}
            fullWidth
            fieldName={SignupFieldNames.boxOrBuilding}
          />
          <StringField
            label={t("websiteLink")}
            fullWidth
            allowInvalidInput
            fieldName={SignupFieldNames.websiteLink}
          />
          <StringField
            label={t("facebookLink")}
            fullWidth
            allowInvalidInput
            fieldName={SignupFieldNames.facebookLink}
          />
          <StringField
            label={t("instagramLink")}
            allowInvalidInput
            fullWidth
            fieldName={SignupFieldNames.instagramLink}
          />
          <StringField
            label={t("tiktokLink")}
            fullWidth
            allowInvalidInput
            fieldName={SignupFieldNames.tiktokLink}
          />
        </div>
        <div className="mt-2 w-full">
          <CustomButton
            onClick={() => onNextClick()}
            text={t("next")}
            type="button"
            width="w-full"
            fontSize="large"
            variant="primary"
          />
          <div className="flex flex-wrap justify-center mt-5 mb-8">
            <p className="text-grayShades-customGray text-center font-normal   text-base px-1">
              {`${t("alreadyHaveAccount")}`}
              <CustomButton
                text={t("space_SignIn")}
                variant="text"
                size="medium"
                fontSize="medium"
                noHover
                onClick={() => navigate(PARENT_ROUTES.login)}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessInformation;
