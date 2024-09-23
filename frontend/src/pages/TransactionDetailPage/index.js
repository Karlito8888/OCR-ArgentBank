import React from "react";
import { useLocation } from "react-router-dom";
import AccountItem from "../../components/AccountItem";
import TransactionDetail from "../../components/TransactionDetail";
import "./style.scss";

const TransactionDetailPage = () => {
  // Récupère les données passées via react-router
  const location = useLocation();
  const { account } = location.state || {};

  if (!account) {
    return <div>No account selected</div>; // Message en cas d'absence de sélection
  }

  return (
    <div className="transaction-detail-page">
      {/* Affiche l'AccountItem en haut */}
      <AccountItem
        title={account.title}
        amount={account.amount}
        description={account.description}
        details={account.details}
      />

      {/* Affiche les détails de la transaction */}
      <TransactionDetail transactions={account.details} />
    </div>
  );
};

export default TransactionDetailPage;
