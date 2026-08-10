import { Outlet } from "react-router-dom";

import BottomNavigation from "./BottomNavigation";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="min-h-screen md:pl-64">
        <MobileHeader />

        <main className="px-4 py-5 pb-24 sm:px-6 md:px-8 md:py-8 md:pb-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
