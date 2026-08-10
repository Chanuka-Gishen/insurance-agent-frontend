import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <p className="mt-2 text-slate-500">Manage application settings.</p>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
