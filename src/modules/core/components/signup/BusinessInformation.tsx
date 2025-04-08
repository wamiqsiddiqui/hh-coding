import { useFormikContext } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../../parentRoutes";
import {
  SignupFieldNames,
  SignupRequestType,
} from "../../../../types/signupTypes";
import CustomButton from "../CustomButton";
import { EmailField, NumberField, StringField } from "../FormFields";
import DropdownInputField from "../DropdownInputField";
import CustomSearchGooglePlaces from "../CustomSearchGooglePlaces";
import { useGetAllBusinessCategories } from "../../../../api/general/reactQueryHooks";

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
const BusinessInformation = ({
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
  const { data: businessCategories } = useGetAllBusinessCategories();
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
  //   const onCheckValidation = (emailCheck?: boolean) => {
  //     if (emailCheck) {
  //       validateField("email");
  //     } else {
  //       if (values.terms === false) {
  //         setCheckError(true);
  //       } else {
  //         setCheckError(false);
  //       }
  //       fieldNames.forEach((name) => setFieldTouched(name, true));
  //       setFieldTouched("confirmPassword", true);
  //       let errorCount = 0;
  //       validateField("confirmPassword").then((error) => {
  //         if (error) {
  //           errorCount++;
  //         }
  //       });
  //       fieldNames.forEach((name, index) =>
  //         validateField(name).then((error) => {
  //           if (error) {
  //             errorCount++;
  //           }
  //           if (
  //             index === fieldNames.length - 1 &&
  //             errorCount === 0 &&
  //             !emailCheck &&
  //             values.terms === true
  //           ) {
  //             setSelectedSection(2);
  //           }
  //         })
  //       );
  //     }
  //   };
  //   const checkEmail = async (checkEmail: boolean) => {
  //     setFieldTouched("email", true);
  //     if (values.email === "") {
  //       onCheckValidation(checkEmail);
  //       return;
  //     }
  //     try {
  //       const emailExistsData = await checkEmailExists(values.email);

  //       if (!emailExistsData?.data.emailExist) {
  //         if (type === RoleEnum.MERCHANT) onCheckValidation(checkEmail);
  //       } else {
  //         setErrors({ ...errors, email: "Email already exists" });
  //       }
  //     } catch (error) {}
  //   };

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
            label="Business Name In English"
            fullWidth
            fieldName={SignupFieldNames.businessNameEng}
          />
          <StringField
            label="Business Name In Arabic"
            fullWidth
            fieldName={SignupFieldNames.businessNameAr}
          />
          <StringField
            label="Manager Name"
            fullWidth
            fieldName={SignupFieldNames.ownerName}
          />
          {businessCategories && (
            <DropdownInputField
              label="Business Category"
              fieldName={SignupFieldNames.businessCategory}
              fullWidth
              isOptional={false}
              options={[
                { name: "Select Business Category", id: "" },
                ...businessCategories.data.data.map((category) => {
                  return { name: category.label, id: category.value };
                }),
              ]}
            />
          )}
          <NumberField
            label="Contact Number"
            fullWidth
            fieldName={SignupFieldNames.contactNo}
          />
          <EmailField
            fullWidth
            label="Email Address"
            fieldName={SignupFieldNames.emailAddress}
          />
          <CustomSearchGooglePlaces />
          <StringField
            label="Box Building Number"
            fullWidth
            fieldName={SignupFieldNames.boxOrBuilding}
          />
          <StringField
            label="Website Link"
            fullWidth
            fieldName={SignupFieldNames.websiteLink}
          />
          <StringField
            label="Facebook Link"
            fullWidth
            fieldName={SignupFieldNames.facebookLink}
          />
          <StringField
            label="Instagram Link"
            fullWidth
            fieldName={SignupFieldNames.instagramLink}
          />
          <StringField
            label="Tiktok Link"
            fullWidth
            fieldName={SignupFieldNames.tiktokLink}
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

export default BusinessInformation;
