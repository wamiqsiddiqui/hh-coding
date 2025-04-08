import { useState } from "react";
// import PersonalInfo from "../components/signup/PersonalInfo";
// import CompanyInfo from "../components/signup/CompanyInfo";
import { Form, Formik } from "formik";
import { SignupFieldNames, SignupFormType } from "../../../types/signupTypes";
import { registerUser } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { setToast } from "../../../redux/toastSlice";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
// import { useEmailExists } from "../../../api/security/reactQueryHooks";
import { TabParent } from "../components/TabParent";
import TabHeader from "../components/TabHeader";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import BusinessInformation from "../components/signup/BusinessInformation";
import LegalDetails from "../components/signup/LegalDetails";
import AccountCredentials from "../components/signup/AccountCredentials";
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
  const [_, setCheckError] = useState(false);
  const initialValues: SignupFormType = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    businessNameEng: "",
    businessNameAr: "",
    businessCategory: "",
    ownerName: "",
    contactNo: "",
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
    SignupFieldNames.businessNameEng,
    SignupFieldNames.businessNameAr,
    SignupFieldNames.ownerName,
    SignupFieldNames.businessCategory,
    SignupFieldNames.emailAddress,
    SignupFieldNames.phoneNo,
    SignupFieldNames.boxOrBuilding,
    SignupFieldNames.websiteLink,
    SignupFieldNames.facebookLink,
    SignupFieldNames.instagramLink,
    SignupFieldNames.tiktokLink,
  ];

  //   const { mutateAsync: checkEmailExists, isPending } = useEmailExists();

  const customCSS: React.CSSProperties = {
    overflowY: "auto",
    padding: "0px",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: SignupFormType, { setSubmitting }) => {
          try {
            // let emailExistsData;
            //   emailExistsData = await checkEmailExists(values.email);

            // if (emailExistsData?.data.emailExist) {

            // setErrors({ emailAddress: "Email already exists" });
            // setSubmitting(false);

            await registerUser({ ...values }, false);
            dispatch(
              setToast({
                text: "Account created successfully. Please check your email to verify your account",
                variant: "success",
              })
            );
            navigate(PARENT_ROUTES.login);
            setSubmitting(false);
          } catch (error) {
            if (error instanceof AxiosError) {
              dispatch(
                setToast({
                  text: error.response?.data.message || "Something went wrong",
                  variant: "error",
                })
              );
            }
          }
        }}
      >
        {({ handleSubmit, setFieldTouched, validateField, errors, values }) => (
          <Form
            className="h-full"
            onSubmit={async (event) => {
              /**After Error Validations, call handle Submit */
              if (values.isAgreedOnTerms === false) {
                setCheckError(true);
              }
              businessInfoFieldNames.forEach(async (field) => {
                await setFieldTouched(field);
                await validateField(field);
              });

              if (
                Object.keys(errors).length === 0 &&
                values.isAgreedOnTerms === true &&
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
                    headerText="Business Information"
                    onClick={() => setSelectedSection(0)}
                    isSelected={selectedSection === 0}
                  />
                  <TabHeader
                    headerText="Legal Details"
                    onClick={() => setSelectedSection(1)}
                    isSelected={selectedSection === 1}
                  />
                  <TabHeader
                    headerText="Account Credentials"
                    onClick={() => setSelectedSection(2)}
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
                      fieldNames={[]}
                      setSelectedSection={setSelectedSection}
                      type={""}
                      isPending={false}
                      selectedSection={selectedSection}
                      checkError={false}
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
                      fieldNames={[]}
                      setSelectedSection={setSelectedSection}
                      type={""}
                      isPending={false}
                      selectedSection={selectedSection}
                      checkError={false}
                    />
                    {/* <PersonalInfo
                    fieldNames={[
                      SignupFieldNames.companyName,
                      SignupFieldNames.firstName,
                      SignupFieldNames.lastName,
                      SignupFieldNames.password,
                      SignupFieldNames.email,
                      SignupFieldNames.terms,
                    ]}
                    type={type}
                    checkEmailExists={checkEmailExists}
                    isPending={isPending}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    checkError={checkError}
                    setCheckError={setCheckError}
                  /> */}
                  </TabParent>
                  <TabParent
                    index={2}
                    fullHeight
                    disAllowHeightReduce
                    selectedSection={selectedSection}
                    customCSS={customCSS}
                  >
                    <AccountCredentials
                      fieldNames={[]}
                      setSelectedSection={setSelectedSection}
                      type={""}
                      isPending={false}
                      selectedSection={selectedSection}
                      checkError={false}
                    />
                    {/* <CompanyInfo
                    fieldNames={
                      type === "dealMaker" || type === "seller"
                        ? []
                        : [
                            SignupFieldNames.crNumber,
                            SignupFieldNames.companySize,
                            SignupFieldNames.companyLegalName,
                            SignupFieldNames.investedCapital,
                            SignupFieldNames.investedCapitalUnit,
                            SignupFieldNames.crDocument,
                            SignupFieldNames.licenseDocument,
                          ]
                    }
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    setSkip={setSkip}
                    skip={skip}
                  /> */}
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
