"use client";

import React from "react";
import { useTheme } from "next-themes";
import Toggle from "@/components/Toggle";
import { Sun, Moon, Share2 } from "lucide-react";
import clsx from "clsx";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const shareUrl = "https://social-reseau.vercel.app/";
  const description = "✨ Découvre une nouvelle manière de te connecter ! 🚀 Jette un coup d'œil à notre application innovante qui transforme ton expérience numérique. Que tu sois en quête d'une nouvelle passion ou que tu veuilles simplement découvrir quelque chose de frais et excitant, cette application a tout ce qu'il te faut !";


  const encodeURIComponentForShare = (text: string) => encodeURIComponent(text);

  // Fonction pour partager sur WhatsApp
  const handleShareWhatsapp = () => {
    const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponentForShare(description + " " + shareUrl)}`;
    window.open(whatsappShareUrl, "_blank");
  };

  // Fonction pour partager sur Facebook
  const handleShareFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponentForShare(shareUrl)}&quote=${encodeURIComponentForShare(description)}`;
    window.open(facebookShareUrl, "_blank");
  };

  // Fonction pour partager par Gmail
  const handleShareGmail = () => {
    const gmailShareUrl = `mailto:?subject=Check this out&body=${encodeURIComponentForShare(description + " " + shareUrl)}`;
    window.location.href = gmailShareUrl;
  };

  // Fonction pour partager sur Instagram
  const handleShareInstagram = () => {
    alert(
      "Partager sur Instagram n'est pas supporté directement via URL. Utilisez l'application Instagram."
    );
  };

  // Fonction pour partager sur Telegram
  const handleShareTelegram = () => {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponentForShare(shareUrl)}&text=${encodeURIComponentForShare(description)}`;
    window.open(telegramShareUrl, "_blank");
  };

  // Fonction pour gérer le changement de thème
  const handleToggleChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div
      className={clsx("p-6", {
        "bg-[#1C1917]": theme === "dark",
        "bg-transparent": theme !== "dark",
      })}
    >
      <div
        className={clsx("max-w-3xl mx-auto p-6 rounded-lg shadow-lg", {
          "bg-[#1C1917] text-white": theme === "dark",
          "bg-white text-black": theme !== "dark",
        })}
      >
        <div className="flex items-center justify-between space-x-4 mb-6">
          <div className="flex items-center space-x-1">
            <Sun className="text-yellow-500" />
            <Toggle
              label={<span className="hidden sm:inline">Claire</span>}
              checked={theme === "light"}
              onChange={() => handleToggleChange("light")}
            />
          </div>
          <div className="flex items-center space-x-1">
            <Moon className="text-gray-300" />
            <Toggle
              label={<span className="hidden sm:inline">Sombre</span>}
              checked={theme === "dark"}
              onChange={() => handleToggleChange("dark")}
            />
          </div>
        </div>

        <hr className="my-8 border-t border-gray-300" />

        <h1 className="text-2xl mb-6">Partager</h1>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 lg:grid-cols-5">
          <button
            onClick={handleShareWhatsapp}
            className="flex items-center space-x-2 px-8 py-2 border rounded-md shadow-sm bg-green-500 text-white hover:bg-green-600"
          >
            <FaWhatsapp className="w-5 h-5" />
          </button>
          <button
            onClick={handleShareFacebook}
            className="flex items-center space-x-2 px-8 py-2 border rounded-md shadow-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaFacebookF className="w-5 h-5" />
          </button>
          <button
            onClick={handleShareGmail}
            className="flex items-center space-x-2 px-8 py-2 border rounded-md shadow-sm bg-red-500 text-white hover:bg-red-600"
          >
            <MdEmail className="w-5 h-5" /> {/* Icône d'enveloppe pour Gmail */}
          </button>
          <button
            onClick={handleShareInstagram}
            className="flex items-center space-x-2 px-8 py-2 border rounded-md shadow-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            <FaInstagram className="w-5 h-5" />
          </button>
          <button
            onClick={handleShareTelegram}
            className="flex items-center space-x-2 px-8 py-2 border rounded-md shadow-sm bg-blue-400 text-white hover:bg-blue-500"
          >
            <FaTelegramPlane className="w-5 h-5" />
          </button>
        </div>
        <hr className="my-8 border-t border-gray-300" />
      </div>
    </div>
  );
}
