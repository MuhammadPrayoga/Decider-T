import React from "react";
import { cn } from "../../lib/utils";

const Card = ({ children, className }) => (
  <div
    className={cn(
      "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 transition-colors duration-300",
      className
    )}
  >
    {children}
  </div>
);

export default Card;
