"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // redirect to login
  }, [router]);

  return null; // or a loader while redirecting
};

export default HomePage;
