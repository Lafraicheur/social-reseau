"use client";

import React from "react";
import { useTheme } from "next-themes";
import Toggle from "@/components/Toggle";
import { Sun, Moon } from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  // Fonction pour gérer le changement de thème
  const handleToggleChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "#1C1917" : "bg-transparent"}`}>
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
          theme === "dark" ? "#1C1917 text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-1">
            <Sun className="text-yellow-500" />
            <Toggle
              label={<span className="hidden sm:inline">Claire</span>} // Affiche le label en mode ordinateur uniquement
              checked={theme === "light"}
              onChange={() => handleToggleChange("light")}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Moon className="text-gray-300" />
            <Toggle
              label={<span className="hidden sm:inline">Sombre</span>} // Affiche le label en mode ordinateur uniquement
              checked={theme === "dark"}
              onChange={() => handleToggleChange("dark")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
