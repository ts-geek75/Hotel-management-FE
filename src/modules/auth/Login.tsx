"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { FormInput } from "@/components/form/formikInput";
import { loginValidation } from "../schema/authValidation";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/generated/graphql";

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // useLoginMutation expects options, we can pass empty object or variables when calling mutateAsync
  const loginMutation = useLoginMutation({});

  const initialValues: LoginFormValues = { email: "", password: "" };

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);

    try {
      // mutateAsync expects variables object matching the GraphQL mutation
      const token: string = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      // backend returns token string directly
      localStorage.setItem("token", token);
      router.replace("/"); // redirect to home
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <Formik initialValues={initialValues} validationSchema={loginValidation} onSubmit={handleSubmit}>
        <Form>
          <FormInput label="Email" name="email" type="email" placeholder="you@example.com" />
          <FormInput label="Password" name="password" type="password" placeholder="Enter password" />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  );
};
