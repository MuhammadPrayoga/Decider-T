import React, { useState } from "react";
import { X } from "lucide-react";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginModal = ({ showLogin, setShowLogin, handleLogin }) => {
  const [loginPassword, setLoginPassword] = useState("");

  if (!showLogin) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Login Admin
          </h3>
          <button
            onClick={() => setShowLogin(false)}
            className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(loginPassword);
          }}
          className="space-y-4"
        >
          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password admin..."
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            autoFocus
          />
          <Button type="submit" className="w-full justify-center">
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginModal;
