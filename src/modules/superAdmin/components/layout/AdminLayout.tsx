import { useSelector } from "react-redux";
import Header from "../../../core/components/Header";
import Sidebar from "../../../core/components/Sidebar";
import { RootState } from "../../../../redux/store";
import { RefObject, useRef, useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
};
const ServiceProviderLayout = ({ children }: LayoutProps) => {
  const language = useSelector(
    (state: RootState) => state.centeralizedStateData.user.language
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleButtonRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  return (
    <div className="h-screen min-h-[calc(100vh-160px)]">
      <div className="flex w-full h-screen">
        <Sidebar
          toggleButtonRef={toggleButtonRef}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={`flex flex-col ${
            language === "en" ? "ml-72 max-md:ml-0" : "mr-72 max-md:mr-0"
          } max-md:w-full w-[calc(100vw-288px)] h-screen bg-tertiary-color overflow-y-auto`}
        >
          <Header
            toggleButtonRef={toggleButtonRef}
            isSidebarOpen={isSidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="px-6 py-6 overflow-y-auto w-full h-[calc(100vh-160px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderLayout;
