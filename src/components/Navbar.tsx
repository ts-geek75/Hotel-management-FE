"use client";

import React, { useEffect, useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-300">
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu size={24} />
      </button>
      <span className="font-bold text-lg">HotelAdmin</span>
      <div className="flex items-center gap-4">
        <div className="text-sm">{email || "Guest"}</div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
