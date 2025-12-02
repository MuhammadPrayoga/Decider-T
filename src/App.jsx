import React, { useState, useMemo, useEffect } from "react";
import { INITIAL_LAPTOPS } from "./data/initialData";
import { MAJORS, calculateTOPSIS } from "./utils/topsis";
import Navbar from "./components/features/Navbar";
import LoginModal from "./components/features/LoginModal";
import AdminPanel from "./components/features/AdminPanel";
import UserPanel from "./components/features/UserPanel";

function App() {
  // --- STATE MANAGEMENT ---

  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  // View State (user | admin)
  const [view, setView] = useState("user");

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Data State
  const [laptops, setLaptops] = useState(() => {
    const saved = localStorage.getItem("spk_laptops_data");
    return saved ? JSON.parse(saved) : INITIAL_LAPTOPS;
  });

  // User Form State
  const [userState, setUserState] = useState({
    name: "",
    major: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [topsisResults, setTopsisResults] = useState(null);
  const [showDebug, setShowDebug] = useState(false);

  // Admin Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cpu: "",
    ram: "",
    storage: "",
    vram: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  // --- EFFECTS ---

  // Persist Laptops
  useEffect(() => {
    localStorage.setItem("spk_laptops_data", JSON.stringify(laptops));
  }, [laptops]);

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- HANDLERS ---

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogin = (password) => {
    if (password === "admin123") {
      setIsAuthenticated(true);
      setShowLogin(false);
      setView("admin");
    } else {
      alert("Password salah!");
    }
  };

  const selectedMajor = useMemo(
    () => MAJORS.find((m) => m.id === userState.major),
    [userState.major]
  );

  const handleSubmit = () => {
    if (!userState.name || !userState.major) {
      alert("Mohon lengkapi data diri!");
      return;
    }

    if (!selectedMajor) return;

    const results = calculateTOPSIS(laptops, selectedMajor.weights);
    setTopsisResults(results);
    setSubmitted(true);
    setShowDebug(false);
  };

  const handleAddLaptop = () => {
    const newLaptop = {
      id: editingId || Date.now(),
      name: formData.name,
      price: Number(formData.price),
      cpu: Number(formData.cpu),
      ram: Number(formData.ram),
      storage: Number(formData.storage),
      vram: Number(formData.vram),
      image: formData.image,
    };

    if (editingId) {
      setLaptops(laptops.map((l) => (l.id === editingId ? newLaptop : l)));
      setEditingId(null);
    } else {
      setLaptops([...laptops, newLaptop]);
    }

    setFormData({
      name: "",
      price: "",
      cpu: "",
      ram: "",
      storage: "",
      vram: "",
      image: "",
    });
  };

  const handleEdit = (laptop) => {
    setFormData({
      name: laptop.name,
      price: laptop.price,
      cpu: laptop.cpu,
      ram: laptop.ram,
      storage: laptop.storage,
      vram: laptop.vram,
      image: laptop.image || "",
    });
    setEditingId(laptop.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus laptop ini?")) {
      setLaptops(laptops.filter((l) => l.id !== id));
    }
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Yakin ingin reset ke data bawaan? Data custom akan hilang."
      )
    ) {
      setLaptops(INITIAL_LAPTOPS);
      localStorage.removeItem("spk_laptops_data");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-200 font-sans selection:bg-red-500/30 transition-colors duration-300">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        view={view}
        setView={setView}
        isAuthenticated={isAuthenticated}
        setShowLogin={setShowLogin}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === "user" ? (
          <UserPanel
            userState={userState}
            setUserState={setUserState}
            submitted={submitted}
            topsisResults={topsisResults}
            showDebug={showDebug}
            setShowDebug={setShowDebug}
            handleSubmit={handleSubmit}
            selectedMajor={selectedMajor}
          />
        ) : (
          <AdminPanel
            laptops={laptops}
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            handleAddLaptop={handleAddLaptop}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleResetData={handleResetData}
          />
        )}
      </main>

      <LoginModal
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        handleLogin={handleLogin}
      />
    </div>
  );
}

export default App;
