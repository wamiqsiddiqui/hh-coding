import Header from "../../../core/components/Header";
import Sidebar from "../../../core/components/Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};
const ServiceProviderLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen min-h-[calc(100vh-64px)]">
      <div className="flex w-full h-screen">
        <Sidebar />
        <div className="flex flex-col w-full h-full bg-tertiary-color overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
      {/* <section className="flex flex-col lg:flex-row justify-center w-full py-[40px] px-3 sm:px-12 h-full">
        <section className="w-full lg:w-4/4 lg:mx-8 2xl:w-[65%] flex flex-col mt-8 lg:mt-0 bg-white rounded-2xl h-full">
          <div className="lg:flex lg:flex-col p-12 max-sm:p-5 max-md:p-7 max-lg:p-8 rounded-2xl h-full">
            {children}
          </div>
        </section>
      </section> */}
    </div>
  );
};

export default ServiceProviderLayout;
