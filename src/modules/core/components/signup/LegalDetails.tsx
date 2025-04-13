import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupFormType,
} from "../../../../types/signupTypes";
import CustomButton from "../CustomButton";
import { StringField } from "../FormFields";
import DocumentUploader from "../DocumentUploader";
import HelperText from "../HelperText";
import { useTranslation } from "react-i18next";
type LegalDetailsProps = {
  fieldNames: SignupFieldNames[];
  setSelectedSection: Dispatch<SetStateAction<number>>;
  type: string;
  isPending: boolean;
  selectedSection: number;
  email?: string;
  checkError: boolean;
  setCheckError?: Dispatch<SetStateAction<boolean>>;
};
const LegalDetails = ({
  setSelectedSection,
  fieldNames,
  selectedSection,
}: LegalDetailsProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);
  const { setFieldTouched, validateField, values } =
    useFormikContext<SignupFormType>();
  const [helperText, setHelperText] = useState("");
  const { t } = useTranslation();
  const onNextClick = () => {
    const hasNoCustomError = values.businessLicenseDoc !== null;
    hasNoCustomError
      ? setHelperText("")
      : setHelperText(t("serviceImageCannotBeEmpty"));
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
          hasNoCustomError
        ) {
          setSelectedSection(2);
        }
      });
    });
  };
  return (
    <>
      <div className="overflow-x-hidden flex flex-col items-center pb-10 px-10">
        <div className="grid gap-x-4 md:grid-cols-2 max-md:grid-cols-1 w-full">
          <StringField
            label={t("commercialRegistrationNumber")}
            fullWidth
            fieldName={SignupFieldNames.commercialRegNo}
          />
          <StringField
            label={t("taxIdNumber")}
            fullWidth
            fieldName={SignupFieldNames.taxId}
          />
          <div className="flex flex-col items-start">
            <DocumentUploader
              fieldName={SignupFieldNames.businessLicenseDoc}
              title={t("businessLicenseDocument")}
            />
            {helperText &&
              values.businessLicenseDoc !== undefined &&
              values.businessLicenseDoc === null && (
                <HelperText helperText={helperText} />
              )}
          </div>
          <StringField
            label={t("bankAccountNumber")}
            fullWidth
            fieldName={SignupFieldNames.bankAccountNo}
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
              {t("alreadyHaveAccount")}
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

export default LegalDetails;
