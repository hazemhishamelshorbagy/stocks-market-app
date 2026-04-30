import React from "react";
import { Input } from "../ui/input";

const InputField = ({
  name,
  placeholder,
  label,
  type = "text",
  register,
  error,
  validation,
  disabled,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="form-label text-gray-400">
        {label}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        id={name}
        disabled={disabled}
        {...register(name, validation)}
        className={`form-input mt-3 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-600 focus:ring-yellow-500"} `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
