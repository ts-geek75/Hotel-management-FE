import React from "react";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, name, type = "text", placeholder }) => (
  <div className="w-full flex flex-col mb-4">
    <label htmlFor={name} className="mb-1 font-medium text-gray-700">{label}</label>
    <Field
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);
