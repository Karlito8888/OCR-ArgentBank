import React from "react";

const NameInput = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NameInput;
