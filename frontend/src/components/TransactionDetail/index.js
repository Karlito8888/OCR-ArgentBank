import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

// Fonction pour reformater les dates au format français
const formatDates = (transactions) =>
  transactions.map(({ date, ...rest }) => {
    const [year, month, day] = date.split("-");
    return { ...rest, date: `${day}/${month}/${year}` }; // Format français
  });

const TransactionDetail = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr onClick={() => setIsOpen((prev) => !prev)} className="transaction">
        <td style={{ textAlign: "left" }}>{transaction.date}</td>
        <td></td>
        <td style={{ textAlign: "left" }}>{transaction.place}</td>
        <td></td>
        <td>{transaction.amount}</td>
        <td>{transaction.balance}</td>
        <td>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            style={{ color: "#ffffff" }}
            size="xl"
          />
        </td>
      </tr>
      {isOpen && (
        <tr className="details-content">
          <td colSpan={3} style={{ textAlign: "left" }}>
            <div>
              <strong>Transaction type:</strong> {transaction.transactionType}{" "}
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
            <div>
              <strong>Category:</strong> {transaction.category}{" "}
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
            <div>
              <strong>Note:</strong> lorem ipsum{" "}
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
          </td>
          <td colSpan={4}></td> {/* Pour garder la structure du tableau */}
        </tr>
      )}
    </>
  );
};

const AccountDetail = ({ transactions }) => {
  const formattedTransactions = formatDates(transactions);

  return (
    <table className="account-detail">
      <thead>
        <tr className="t-header">
          <th>Date</th>
          <th></th>
          <th>Description</th>
          <th></th>
          <th>Amount</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="t-body">
        {formattedTransactions.map((transaction, index) => (
          <TransactionDetail key={index} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default AccountDetail;
