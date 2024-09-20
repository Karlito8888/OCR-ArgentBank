// UserPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import accountsData from "./db.json";
import AccountItem from "../../components/AccountItem";
import { getUserProfile } from "../../redux/authSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, token, userName, firstName } = useSelector(
    (state) => state.auth
  );
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // On simuler un appel API pour charger les données depuis le fichier JSON
    setAccounts(accountsData.accounts);

    // Si l'utilisateur est connecté, récupérer le profil
    if (isLoggedIn && token) {
      dispatch(getUserProfile(token));
    }
  }, [isLoggedIn, token, dispatch]);

  return (
    <div className="main bg-dark">
      <div className="userpage-header">
        <h1>
          Welcome back
          <br />
          {userName || firstName || "User"} !
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* Itération des comptes à partir des données dynamiques */}
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
};

export default UserPage;
