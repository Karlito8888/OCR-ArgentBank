import React from "react";

const NameInput = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange} 
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NameInput;

