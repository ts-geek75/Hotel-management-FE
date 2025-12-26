"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/modules/admin/AdminDashboard";
import UserDashboard from "@/modules/user/UserDashboard";

const HomePage = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role || null);
      } catch (err) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (role === "admin") return <AdminDashboard />;
  if (role === "user") return <UserDashboard />;

  return null;
};

export default HomePage;
