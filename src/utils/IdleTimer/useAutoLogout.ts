import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toastSlice";
import { useIdleTimeout } from "./useIdleTimeout";
import { useLogout } from "../hooks";

export function useAutoLogout(duration: number) {
  const logout = useLogout();
  const dispatch = useDispatch();

  const { user } = useIdleTimeout(duration, () => {
    if (user) {
      logout();
      dispatch(
        setToast({
          text: "You've been logged out due to inactivity",
          variant: "warning",
        })
      );
    }
  });
}
