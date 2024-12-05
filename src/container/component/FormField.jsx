

export const FormField = ({ name, id, values, styles, type, setValue, placeholder, required }) => {
  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <input
      type={type || "text"}
      placeholder={placeholder || ""}
      name={name}
      value={values[name]}
      id={id}
      onChange={handleInputChange}
      className={
        styles ||
        "rounded-md w-full border border-slate-200 outline-slate-200 p-2  text-sm text-slate-500"
      }
      required={required || ""}
    />
  );
};
