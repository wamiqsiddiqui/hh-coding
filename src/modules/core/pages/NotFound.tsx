import { useNavigate } from "react-router-dom";
import notFound from "../../../assets/images/notFound.svg";
import { PARENT_ROUTES } from "../../../parentRoutes";
import CustomButton from "../components/CustomButton";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full mt-0 overflow-auto bg-gradient-to-b from-white to-gray-200 text-custom-black flex flex-col items-center justify-center">
      <h1 className="text-7xl max-lg:text-5xl max-sm:text-4xl  text-custom-green font-bold mb-8 animate-pulse">
        404 Not Found!
      </h1>
      <p className="text-grayShades-customGray font-bold text-2xl mb-4">
        {`uh-oh! Nothing here....`}
      </p>
      <img
        alt=""
        className="h-[400px] w-[400px] max-md:h-[300px] max-md:w-[300px] max-sm:h-[200px] max-sm:w-[200px]"
        src={notFound}
      />
      <CustomButton
        text="Go Home"
        onClick={() => navigate(PARENT_ROUTES.login)}
      />
    </div>
  );
};

export default NotFound;
