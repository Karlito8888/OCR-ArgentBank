// UserPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../redux/authActions";
import EditForm from "../../containers/EditForm";
import AccountItem from "../../components/AccountItem";
import accountsData from "./db.json";
import "./style.scss";

const UserPage = () => {
  const dispatch = useDispatch();
  const { userInfo, userToken, error, loading } = useSelector(
    (state) => state.user
  );
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (userToken) {
      dispatch(getUserProfile());
    }
    // Chargement des comptes depuis db.json
    setAccounts(accountsData.accounts); // Simule un appel API, ici db.json
  }, [dispatch, userToken]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (userName) => {
    const resultAction = await dispatch(updateUserProfile({ userName }));
    if (updateUserProfile.fulfilled.match(resultAction)) {
      setIsEditing(false);
      dispatch(getUserProfile());
    } else {
      console.error(resultAction.payload);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="main bg-dark">
      <div className="userpage-header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {userInfo.userName || userInfo.firstName || "Dear user"}!
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
          userName={userInfo.userName} // Utilisez directement userInfo.userName
          handleUsernameChange={(newValue) => handleSave(newValue)} // Passez la nouvelle valeur à handleSave
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          handleSave={handleSave} // Vous pouvez passer simplement handleSave
          handleCancel={handleCancel}
          token={userToken}
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
