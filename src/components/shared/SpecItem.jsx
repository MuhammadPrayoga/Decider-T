import React from "react";

const SpecItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-xs text-slate-500 font-medium uppercase">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
        {value}
      </p>
    </div>
  </div>
);

export default SpecItem;
