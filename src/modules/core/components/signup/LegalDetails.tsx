import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupRequestType,
} from "../../../../types/signupTypes";
import CustomButton from "../CustomButton";
import { StringField } from "../FormFields";
import DocumentUploader from "../DocumentUploader";
type PersonalInfoProps = {
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
  //   fieldNames,
  //   type,
  //   isPending,
  selectedSection,
  email,
}: //   checkError,
//   setCheckError,
PersonalInfoProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);
  const {
    // setFieldTouched,
    // validateField,
    values,
    // setErrors,
    // errors,
    setFieldValue,
    // isSubmitting,
  } = useFormikContext<SignupRequestType>();

  useEffect(() => {
    if (email) {
      setFieldValue("email", email);
    }
  }, [email, setFieldValue]);
  console.log("values = ", values);
  return (
    <>
      <div className="overflow-x-hidden flex flex-col items-center pb-10 px-10">
        <div className="grid gap-x-4 md:grid-cols-2 max-md:grid-cols-1 w-full">
          <StringField
            label="Commercial Registration Number"
            fullWidth
            fieldName={SignupFieldNames.commercialRegNo}
          />
          <StringField
            label="Tax ID Number"
            fullWidth
            fieldName={SignupFieldNames.taxId}
          />
          <DocumentUploader
            fieldName={SignupFieldNames.businessLicenseDoc}
            title=" Copy of Business License / Municipality Permit"
          />
          <StringField
            label="Bank Account Number"
            fullWidth
            fieldName={SignupFieldNames.bankAccountNo}
          />
        </div>
        <div className="mt-0">
          <CustomButton
            onClick={() => () => setSelectedSection(1)}
            text={"Continue"}
            fontFamily=" "
            fontSize="large"
            variant="primary"
          />

          <div className="flex flex-wrap justify-center mt-5 mb-8">
            <p className="text-grayShades-customGray text-center font-normal   text-base px-1">
              {`Already have an account? `}
              <CustomButton
                text=" Sign in"
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
