import React from "react";
import { Calculator, Sun, Moon, User, LayoutDashboard } from "lucide-react";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.png";

const Navbar = ({
  theme,
  toggleTheme,
  view,
  setView,
  isAuthenticated,
  setShowLogin,
}) => {
  return (
    <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 overflow-hidden">
            <img
              src={logo}
              alt="Decider-T Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              Decider-T
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Metode TOPSIS
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setView("user")}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                view === "user"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <User size={16} /> Pengguna
            </button>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  setView("admin");
                } else {
                  setShowLogin(true);
                }
              }}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                view === "admin"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <LayoutDashboard size={16} /> Admin
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
