"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setEmail(payload.email || "");
      } catch {
        setEmail("");
      }
    }
  }, []);

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-300">
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu size={24} />
      </button>
      <span className="font-bold text-lg">HotelAdmin</span>
      <div className="text-sm">{email || "Guest"}</div>
    </header>
  );
};

export default Navbar;
