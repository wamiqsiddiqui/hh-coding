import { useNavigate } from "react-router-dom";
import { HappyHourLogoSvg } from "../../../utils/svgIcons";
import { PARENT_ROUTES } from "../../../parentRoutes";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-72 h-screen bg-white flex flex-col items-center justify-start py-8 border-r border-gray-200">
      <HappyHourLogoSvg
        width="116"
        height="56"
        className="cursor-pointer"
        onClick={() => {
          navigate(PARENT_ROUTES.serviceProvider);
        }}
      />
      <div className="flex flex-col items-center">
        <nav className="flex flex-col gap-4 mt-8">
          <a
            href="/profile"
            className="text-lg font-semibold text-start text-gray-700 hover:text-gray-900"
          >
            Profile
          </a>
          <a
            href="/dashboard"
            className="text-lg font-semibold text-start text-gray-700 hover:text-gray-900"
          >
            Dashboard
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
