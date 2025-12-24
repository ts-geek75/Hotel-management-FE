"use client"
import React from "react";
import { Formik, Form } from "formik";
import { FormInput } from "@/components/form/formikInput";
import { registerValidation } from "../schema/authValidation";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm: React.FC = () => {
  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: RegisterFormValues) => {
    console.log("Register Data:", values);
  };

  return (
    <div className="max-w-md w-full mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <Formik initialValues={initialValues} validationSchema={registerValidation} onSubmit={handleSubmit}>
        <Form>
          <FormInput label="Name" name="firstName" placeholder="John" />
          <FormInput label="Email" name="email" type="email" placeholder="you@example.com" />
          <FormInput label="Password" name="password" type="password" placeholder="Enter password" />
          <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm password" />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-4"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};
