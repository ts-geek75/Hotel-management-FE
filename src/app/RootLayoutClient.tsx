"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/client";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (loading) return null;

  return (
    <>
      {isAuthenticated && !isAuthPage ? (
        <div className="flex h-screen w-full">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 flex flex-col overflow-auto">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </>
  );
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <LayoutContent>{children}</LayoutContent>
      </AuthProvider>
    </ApolloProvider>
  );
}
