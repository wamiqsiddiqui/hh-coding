import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSendResetEmail } from "../../../api/security/reactQueryHooks";
// import emailSent from "../../../assets/gifs/emailSent.gif";
import CustomButton from "../components/CustomButton";
import { EmailField } from "../components/FormFields";
// import Loader from "../components/Loader";
const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const [_, setEmail] = useState("");
  const navigate = useNavigate();
  //   const { mutate: sendResetEmail, isSuccess, isPending } = useSendResetEmail();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-custom-black relative bg-stripes bg-no-repeat bg-cover bg-bottom-right-lg max-md:bg-bottom lg:bg-bottom-right 2xl:bg-bottom-right xl:bg-bottom-right w-full">
      <div className="bg-custom-white p-12 rounded-lg md:shadow-md w-full sm:w-96 xl:min-w-[310px] my-8   flex flex-col items-center">
        <p className="text-2xl text-center   mb-4 font-semibold">
          Password Recovery
        </p>
        {/* {isPending && <Loader />} */}
        {/* {isSuccess ? (
          <div>
            <img
              alt="Is showing a success email animated gif"
              className="w-full h-64 max-md:w-[95%] max-sm:w-full"
              src={emailSent}
            />
            <p className="text-lg text-center   mb-8 2xl:mb-2">
              Reset Password link has been sent to you on
            </p>
            <p className="text-xl my-4 text-center font-semibold  ">{email}</p>
            <CustomButton
              text="Back to login"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        ) : */}
        (
        <>
          <div className="mb-8 2xl:mb-6">
            <p className="text-base text-center  ">Enter your email.</p>
            <p className="text-base text-center  ">
              Reset Password Link will be sent to you.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: { email: string }) => {
              setEmail(values.email);
              // sendResetEmail({ email: values.email });
            }}
          >
            {() => (
              <Form className="flex flex-col 2xl:space-y-2 w-full">
                <EmailField
                  autoFocus
                  isFloating
                  fieldName="email"
                  placeholder=""
                  label="Email"
                  fullWidth
                />
                <div className="flex flex-col items-center gap-y-4">
                  <CustomButton
                    text="Send Password Reset Email"
                    type="submit"
                  />
                  <div className="flex justify-center items-center w-1/3">
                    <CustomButton
                      noHover
                      text="Back"
                      onClick={() => {
                        navigate(-1);
                      }}
                      variant="text"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
        ){/* } */}
      </div>
    </div>
  );
};

export default ForgotPassword;
