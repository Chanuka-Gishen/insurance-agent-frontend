import { NavLink } from "react-router-dom";

import { navigationItems } from "../../config/navigation";

const BottomNavigation = () => {
  const mobileItems = navigationItems.filter((item) => item.mobile);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="grid grid-cols-4">
        {mobileItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex min-h-[64px] flex-col items-center justify-center gap-1 px-1 text-xs font-medium transition",
                  isActive ? "text-blue-600" : "text-slate-500",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={[
                      "rounded-xl p-1.5 transition",
                      isActive ? "bg-blue-50" : "",
                    ].join(" ")}
                  >
                    <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
};

export default BottomNavigation;
