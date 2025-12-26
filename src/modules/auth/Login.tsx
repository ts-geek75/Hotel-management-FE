"use client";

import React, { useState } from "react";
import { Briefcase, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components";
import { FormInput } from "@/components/form/formikInput";
import { useAuth } from "@/context/AuthContext";
import { loginValidation } from "./schema/authValidation";
import { useLoginMutation } from "@/generated/graphql";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, setAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginUser, { loading }] = useLoginMutation();

  if (isAuthenticated || loading) {
    return <Loader />;
  }

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);

    try {
      const { data } = await loginUser({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      const token = data?.loginUser;

      if (!token) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      setAuthenticated(true);

      router.replace("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-110 space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-2xl bg-teal-500">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HotelAdmin</h1>
            <p className="text-gray-600 mt-2">
              Sign in to manage your hotel operations
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="admin@hotel.com"
                  leftIcon={<Mail className="h-5 w-5" />}
                />

                <FormInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  }
                />

                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  Sign In
                </Button>
              </Form>
            </Formik>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button asChild variant="link" className="text-teal-600">
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
