import { useState } from "react";

export const FormField = ({
  name,
  id,
  values,
  styles,
  type,
  setValue,
  placeholder,
  required,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={type === "password" && showPassword ? "text" : type || "text"}
        placeholder={placeholder || ""}
        name={name}
        value={values[name] || ""}
        id={id}
        onChange={handleInputChange}
        className={
          styles ||
          "rounded-md w-full border border-slate-200 outline-slate-200 p-2 text-sm text-slate-500 pr-10"
        }
        required={required || ""}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500"
        >
          {showPassword ? "👁️" : "🙈"}
        </button>
      )}
      {errors && errors[name] && (
        <span className="text-xs text-red-500">{errors[name]}</span>
      )}
    </div>
  );
};
