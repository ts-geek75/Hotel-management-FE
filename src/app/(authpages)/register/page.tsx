"use client"
import React from "react";
import { RegisterForm } from "@/modules/auth/Register";

const RegisterPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <RegisterForm />
  </div>
);

export default RegisterPage;
