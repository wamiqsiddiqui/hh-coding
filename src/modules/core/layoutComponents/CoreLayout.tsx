import { useLocation } from "react-router-dom";
// import Header from "../components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
// import { RootState } from "../../../redux/store";

type CoreLayoutProps = {
  children: React.ReactNode;
};
const CoreLayout = ({ children }: CoreLayoutProps) => {
  const location = useLocation();
  const { onScroll } = useSelector(
    (state: RootState) => state.centeralizedStateData.scroll
  );
  /**If there's a need to make header not sticky after some scroll down then revert back to it by removing the 'overflow-auto' class from below div*/
  return (
    <>
      {/* <Header /> */}
      <div
        onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>) =>
          onScroll && onScroll(event)
        }
        className={`bg-secondary-green ${
          location.pathname.includes("login")
            ? "overflow-hidden"
            : "overflow-auto"
        } h-screen`} /**h-[calc(100vh-64px)] */
      >
        {children}
      </div>
    </>
  );
};

export default CoreLayout;
