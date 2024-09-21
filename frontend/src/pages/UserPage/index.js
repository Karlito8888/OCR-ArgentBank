// UserPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import accountsData from "./db.json";
import AccountItem from "../../components/AccountItem";
import { getUserProfile, updateUserProfile } from "../../redux/authSlice";
import EditForm from "../../containers/EditForm";

const UserPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, userName, firstName, lastName } = useSelector(
    (state) => state.auth
  );
  const [accounts, setAccounts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
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
        <h1>
          Welcome back
          <br />
          {userName || firstName || "Dear user"} !
        </h1>
        {/* Rendu conditionnel pour le bouton */}
        {!isEditing ? (
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        ) : (
          <p className="edit-user-info">Edit user info</p>
        )}
      </div>

      {/* Formulaire d'édition du nom */}
      {isEditing && (
        <EditForm
          newUsername={newUsername}
          handleUsernameChange={handleUsernameChange}
          firstName={firstName}
          lastName={lastName}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      )}

      <h2 className="sr-only">Accounts</h2>

      {/* Itération des comptes à partir des données dynamiques */}
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
  );
};

export default UserPage;
