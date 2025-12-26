"use client";

import React from "react";
import { Home, Users, Calendar, X } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
  setActivePage?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  toggleSidebar = () => {},
  setActivePage = () => {},
}) => {
  const links = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/" },
    { name: "Rooms", icon: <Home size={20} />, href: "/rooms" },
    { name: "Guests", icon: <Users size={20} />, href: "/guests" },
    { name: "Bookings", icon: <Calendar size={20} />, href: "/admin/bookings" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`w-64 min-h-full bg-gray-900 text-white flex flex-col transition-transform duration-300 md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"} fixed md:static z-40 top-0 left-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-lg font-bold">HotelAdmin</span>
          <button className="md:hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4 flex flex-col flex-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActivePage(link.name)}
              className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              {link.icon}
              <span className="ml-3">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 text-sm text-gray-400 w-full border-t border-gray-700">
          © 2025 Hotel Management
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
