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
    onChange(e.target.value); // Passez la valeur du champ à onChange
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange} // Utilisez handleChange ici
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default NameInput;
