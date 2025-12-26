import React from "react";
import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  inputClassName = "",
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>

    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}

      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          leftIcon ? "pl-11" : ""
        } ${rightIcon ? "pr-11" : ""} ${inputClassName}`}
      />

      {rightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>

    <ErrorMessage
      name={name}
      component="p"
      className="text-sm text-red-600"
    />
  </div>
);
