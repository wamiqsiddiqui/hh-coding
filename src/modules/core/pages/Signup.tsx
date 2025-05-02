import { useState } from "react";
import { Form, Formik } from "formik";
import { SignupFieldNames, SignupFormType } from "../../../types/signupTypes";
import { registerUser } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/toastSlice";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
import { TabParent } from "../components/TabParent";
import TabHeader from "../components/TabHeader";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import BusinessInformation from "../components/signup/BusinessInformation";
import LegalDetails from "../components/signup/LegalDetails";
import AccountCredentials from "../components/signup/AccountCredentials";
import Loader from "../components/Loader";
export const TabParentt = ({
  children,
  selectedSection,
}: {
  children: React.ReactNode;
  selectedSection: number;
}) => {
  const getTranslateX = () => {
    return `-${selectedSection}00%`;
  };
  return (
    <div
      style={{ transform: `translateX(${getTranslateX()})` }}
      className={`px-10 py-5 max-md:px-6 shrink-0 w-full transition-all duration-1000`}
    >
      {children}
    </div>
  );
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSection, setSelectedSection] = useState(0);
  const initialValues: SignupFormType = {
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    address: "",
    businessNameEn: "",
    businessNameAr: "",
    businessCategory: "",
    managerName: "",
    location: [],
    businessLicenseDoc: null,
    isAgreedOnTerms: false,
    securityQuestion: "",
    securityQuestionAns: "",
    commercialRegNo: "",
    taxId: "",
    bankAccountNo: "",
    boxOrBuilding: "",
    facebookLink: "",
    instagramLink: "",
    websiteLink: "",
    tiktokLink: "",
  };
  const businessInfoFieldNames = [
    SignupFieldNames.businessNameEn,
    SignupFieldNames.businessNameAr,
    SignupFieldNames.managerName,
    SignupFieldNames.businessCategory,
    SignupFieldNames.phoneNo,
    SignupFieldNames.emailAddress,
    SignupFieldNames.boxOrBuilding,
    SignupFieldNames.websiteLink,
    SignupFieldNames.facebookLink,
    SignupFieldNames.instagramLink,
    SignupFieldNames.tiktokLink,
  ];
  const legalDetailsFieldNames = [
    SignupFieldNames.commercialRegNo,
    SignupFieldNames.taxId,
    SignupFieldNames.businessLicenseDoc,
    SignupFieldNames.bankAccountNo,
  ];
  const accountCredentialsFieldNames = [
    SignupFieldNames.password,
    SignupFieldNames.confirmPassword,
    SignupFieldNames.securityQuestion,
    SignupFieldNames.securityQuestionAns,
  ];

  const customCSS: React.CSSProperties = {
    overflowY: "auto",
    padding: "0px",
  };
  const [checkError, setCheckError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      {isLoading && <Loader />}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: SignupFormType, { setSubmitting }) => {
          try {
            setLoading(true);
            await registerUser({ ...values });
            setLoading(false);
            dispatch(
              setToast({
                text: t("registrationSuccess"),
                variant: "success",
              })
            );
            navigate(PARENT_ROUTES.login);
            setSubmitting(false);
          } catch (error) {
            setLoading(false);
            if (error instanceof AxiosError) {
              dispatch(
                setToast({
                  text: error.response?.data.message || t("somethingWentWrong"),
                  variant: "error",
                })
              );
            }
          }
        }}
      >
        {({ values, handleSubmit, setFieldTouched, validateField, errors }) => (
          <Form
            className="h-full"
            onSubmit={async (event) => {
              /**After Error Validations, call handle Submit */
              if (values.isAgreedOnTerms === false) {
                setCheckError(true);
              }
              accountCredentialsFieldNames.forEach(async (field) => {
                await setFieldTouched(field);
                await validateField(field);
              });
              if (
                Object.keys(errors).length === 0 &&
                values.isAgreedOnTerms &&
                values.businessLicenseDoc
              ) {
                handleSubmit();
              }
              event.preventDefault();
            }}
          >
            <div className="flex justify-center h-full">
              <div className="flex flex-col xl:w-[800px] w-[800px] md:my-12 md:h-fit bg-white sm:shadow-md landscape:max-md:rounded-none rounded-xl">
                <SubHeader />
                <p className="text-3xl font-bold">
                  {t("BusinessRegistration")}
                </p>
                <p className="text-lg font-medium text-hhGrayShades-textGray mt-2 mb-4">
                  {t("fill_form_for_registration")}
                </p>

                <div className="flex w-full justify-center mb-4">
                  <TabHeader
                    headerText={t("businessInformation")}
                    onClick={
                      selectedSection > 0
                        ? () => setSelectedSection(0)
                        : undefined
                    }
                    isSelected={selectedSection === 0}
                  />
                  <TabHeader
                    headerText={t("legalDetails")}
                    onClick={
                      selectedSection > 1
                        ? () => setSelectedSection(1)
                        : undefined
                    }
                    isSelected={selectedSection === 1}
                  />
                  <TabHeader
                    headerText={t("accountCredentials")}
                    onClick={
                      selectedSection > 1
                        ? () => setSelectedSection(2)
                        : undefined
                    }
                    isSelected={selectedSection === 2}
                  />
                </div>
                <div className={`flex overflow-hidden`}>
                  <TabParent
                    index={0}
                    fullHeight
                    noPadding
                    disAllowHeightReduce
                    selectedSection={selectedSection}
                    customCSS={customCSS}
                  >
                    <BusinessInformation
                      fieldNames={businessInfoFieldNames}
                      setSelectedSection={setSelectedSection}
                      selectedSection={selectedSection}
                    />
                  </TabParent>
                  <TabParent
                    index={1}
                    disAllowHeightReduce
                    fullHeight
                    selectedSection={selectedSection}
                    customCSS={customCSS}
                  >
                    <LegalDetails
                      fieldNames={legalDetailsFieldNames}
                      setSelectedSection={setSelectedSection}
                      selectedSection={selectedSection}
                    />
                  </TabParent>
                  <TabParent
                    index={2}
                    fullHeight
                    disAllowHeightReduce
                    selectedSection={selectedSection}
                    customCSS={customCSS}
                  >
                    <AccountCredentials
                      selectedSection={selectedSection}
                      checkError={checkError}
                    />
                  </TabParent>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Signup;
