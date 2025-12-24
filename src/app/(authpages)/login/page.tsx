"use client"
import React from "react";
import { LoginForm } from "@/modules/auth/Login";

const LoginPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <LoginForm />
  </div>
);

export default LoginPage;
