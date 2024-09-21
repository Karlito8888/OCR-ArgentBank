import React from "react";
import "./style.scss";
import NameInput from "../../components/NameInput";

const EditForm = ({
  newUsername,
  handleUsernameChange,
  firstName,
  lastName,
  handleSave,
  handleCancel,
}) => {
  return (
    <form className="edit-form">
      <NameInput
        id="username"
        label="User name"
        value={newUsername}
        onChange={handleUsernameChange}
        placeholder={newUsername || "Enter your username"}
      />
      <NameInput
        id="firstname"
        label="First name"
        value={firstName}
        disabled={true}
        placeholder={firstName || "First name"}
      />
      <NameInput
        id="lastname"
        label="Last name"
        value={lastName}
        disabled={true}
        placeholder={lastName || "Last name"}
      />

      <div className="form-buttons">
        <button type="button" className="save-button" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
