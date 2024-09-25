import React, { useEffect, useState } from "react";
import NameInput from "../../components/NameInput";
import "./style.scss";

const EditForm = ({
  userName,
  firstName,
  lastName,
  handleSave,
  handleCancel,
  handleUsernameChange,
}) => {
  const [localUserName, setLocalUserName] = useState(userName);

  useEffect(() => {
    setLocalUserName(userName);
  }, [userName]);

  const handleSubmit = () => {
    if (!localUserName.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    // Appelle la fonction passée en prop pour mettre à jour le nom d'utilisateur
    handleUsernameChange(localUserName);
    handleSave(); // Appel de la fonction pour enregistrer
  };

  return (
    <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
      <NameInput
        id="username"
        label="User name"
        value={localUserName}
        onChange={setLocalUserName} // Passer directement la fonction ici
        placeholder={userName || "Enter your username"}
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
        <button type="button" className="save-button" onClick={handleSubmit}>
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
