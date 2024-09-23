// UserPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import accountsData from "./db.json";
import AccountItem from "../../components/AccountItem";
import { getUserProfile, updateUserProfile } from "../../redux/authSlice";
import EditForm from "../../containers/EditForm";
import { useLocation } from "react-router-dom";

const UserPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn, token, userName, firstName, lastName } = useSelector(
    (state) => state.auth
  );
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(
    location.state?.isEditing || false
  );
  const [newUsername, setNewUsername] = useState(userName);

  useEffect(() => {
    setAccounts(accountsData.accounts); // Simule un appel API, ici db.json

    // Si l'utilisateur est connecté, on récupère le profil
    if (isLoggedIn && token) {
      dispatch(getUserProfile(token));
    }
  }, [isLoggedIn, token, dispatch]);

  // Gestion du changement du form Edit Name
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleSave = () => {
    if (newUsername !== userName) {
      dispatch(updateUserProfile({ token, userName: newUsername }));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewUsername(userName); // Réinitialise l'input
    setIsEditing(false);
  };

  return (
    <div className="main bg-dark">
      <div className="userpage-header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {userName || firstName || "Dear user"}!
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        ) : (
          <h1>Edit user info</h1>
        )}
      </div>
      {isEditing && (
        <EditForm
          userName={userName}
          handleUsernameChange={handleUsernameChange}
          firstName={firstName}
          lastName={lastName}
          handleSave={handleSave}
          handleCancel={handleCancel}
          token={token}
        />
      )}
      <h2 className="sr-only">Accounts</h2>
      <div className="accounts-container">
        {accounts.map((account) => (
          <AccountItem
            key={account.id}
            title={account.title}
            amount={account.amount}
            description={account.description}
            details={account.details}
          />
        ))}
      </div>
    </div>
  );
};

export default UserPage;

