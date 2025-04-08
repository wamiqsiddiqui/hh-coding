import { Form, Formik } from "formik";
import { ConfirmPasswordField, PasswordField } from "../components/FormFields";
// import { useUpdatePassword } from "../../../api/security/reactQueryHooks";
// import emailSent from "../../../assets/gifs/emailSent.gif";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { PARENT_ROUTES } from "../../../parentRoutes";
// import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import { setToast } from "../../../redux/toastSlice";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [_] = useSearchParams();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  //   const {
  //     mutateAsync: updatePassword,
  //     isSuccess,
  //     isPending,
  //   } = useUpdatePassword();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-custom-black relative bg-stripes bg-no-repeat bg-cover bg-bottom-right-lg max-md:bg-bottom lg:bg-bottom-right 2xl:bg-bottom-right xl:bg-bottom-right w-full">
      <div className="bg-custom-white p-12 rounded-lg shadow-smgreen w-full sm:w-96 xl:min-w-[310px] my-8   flex flex-col items-center">
        <p className="text-4xl text-center font-thin   italic mb-0">
          Set New Password
        </p>
        {/* {isPending && <Loader />} */}
        {
          // isSuccess ? (
          //   <div>
          //     <img
          //       alt="Is showing a success email animated gif"
          //       className="w-full h-64 max-md:w-[95%] max-sm:w-full"
          //       src={emailSent}
          //     />
          //     <p className="text-xl text-center font-thin   italic mb-8 2xl:mb-2">
          //       Your password has been successfully updated. You can now use your
          //       new password to log in to your account.
          //     </p>
          //     <p className="text-xl mb-4 text-center font-semibold  ">
          //       {/* {email} */}
          //     </p>
          //     <CustomButton
          //       text="Back to login"
          //       onClick={() => {
          //         navigate(PARENT_ROUTES.login);
          //       }}
          //     />
          //   </div>
          // ) :
          <>
            <p className="text-xl text-center font-thin   italic mb-8 2xl:mb-12">
              {/* Enter your email. Reset Password Link will be send to you. */}
            </p>
            <Formik
              initialValues={initialValues}
              onSubmit={async () =>
                //     values: {
                //     password: string;
                //     confirmPassword: string;
                //   }
                {
                  try {
                    //   await updatePassword({
                    //     token: `${searchParams.get("token")}`,
                    //     password: values.password,
                    //   });
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      dispatch(
                        setToast({
                          text:
                            error.response?.data.message ||
                            "Something went wrong",
                          variant: "error",
                        })
                      );
                    }
                  }
                }
              }
            >
              {({ values }) => (
                <Form className="flex flex-col 2xl:space-y-2 w-full">
                  <PasswordField
                    fullWidth
                    placeholder="Password"
                    fieldName={"password"}
                  />
                  <ConfirmPasswordField
                    fullWidth
                    passwordFieldValue={values.password}
                    placeholder="Confirm Password"
                    fieldName={"confirmPassword"}
                  />
                  <div className="flex flex-col gap-y-4">
                    <CustomButton text="Update Password" type="submit" />
                    <CustomButton
                      text="Cancel"
                      onClick={() => {
                        navigate(PARENT_ROUTES.login);
                      }}
                      variant="secondary"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </>
        }
      </div>
    </div>
  );
};

export default UpdatePassword;
