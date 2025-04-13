import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../../redux/toastSlice";
import { RootState } from "../../../redux/store";
import { FaCheckCircle, PiWarningDiamondFill } from "../../../utils/icons";

const Toast = () => {
  const { text, variant } = useSelector(
    (state: RootState) => state.centeralizedStateData.toast
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (text) {
      setTimeout(() => {
        dispatch(setToast({ text: "", variant: variant }));
      }, 5000);
    }
  }, [text, dispatch, variant]);
  return (
    <div
      className={`fixed bottom-3 right-3 min-h-20 w-80 ${
        variant === "error"
          ? "bg-red-500"
          : variant === "success"
          ? "bg-green-500"
          : "bg-[#fd7e14]"
      }  flex items-center tranistion-opacity ${
        text
          ? "opacity-100 z-[10000000000000000000000000000]"
          : "opacity-0 -z-1"
      }`}
    >
      {variant === "success" ? (
        <FaCheckCircle className="hh__icon-white" />
      ) : (
        <PiWarningDiamondFill className="hh__icon-white" />
      )}
      <div className="flex items-start py-4 flex-col mr-3">
        <h6 className="text-white my-2 font-semibold">
          {variant === "success"
            ? "Success"
            : variant === "warning"
            ? "Warning"
            : "Error!"}
        </h6>
        <p className="text-white text-start mb-2 text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Toast;
