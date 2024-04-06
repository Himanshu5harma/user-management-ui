import { useState } from "react";

const CustomInput = (props) => {
  const {
    label,
    id,
    name,
    type,
    autoComplete,
    required,
    value,
    onChange,
    placeholder,
  } = props;
//   const [newValue, setNewValue] = useState(value);
//   const onChange = (e)=>{
//     setNewValue(e.target.value);
//     onChangeHandler(e);
//   }
  return (
    <div>
      <label htmlFor="username" className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
