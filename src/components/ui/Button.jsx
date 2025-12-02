import React from "react";
import { cn } from "../../lib/utils";

const Button = ({ children, variant = "primary", className, ...props }) => {
  const variants = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20",
    secondary:
      "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200",
    danger:
      "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50",
    ghost:
      "hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
