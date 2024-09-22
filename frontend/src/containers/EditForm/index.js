// src/components/EditForm.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NameInput from "../../components/NameInput";
import { getUserProfile, updateUserProfile } from "../../redux/authSlice";
import "./style.scss";

const EditForm = ({
  userName,
  firstName,
  lastName,
  handleSave,
  handleCancel,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [localUserName, setLocalUserName] = useState(userName);

  useEffect(() => {
    setLocalUserName(userName);
  }, [userName]);

  const handleUsernameChange = (newValue) => {
    setLocalUserName(newValue);
  };

  const handleSubmit = () => {
    if (!token) {
      alert("Token is missing! Please log in again.");
      return;
    }
    if (!localUserName.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    dispatch(updateUserProfile({ token, userName: localUserName }))
      .unwrap()
      .then(() => {
        dispatch(getUserProfile(token));
        handleSave();
      })
      .catch((error) => alert(`Error updating profile: ${error}`));
  };

  return (
    <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
      <NameInput
        id="username"
        label="User name"
        value={localUserName}
        onChange={handleUsernameChange}
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
