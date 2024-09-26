import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

// Fonction pour reformater une seule date
const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const TransactionDetail = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [note, setNote] = useState("lorem ipsum");
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category
  );

  const toggleDetails = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Catégories disponibles
  const categories = [
    "Supermarché",
    "Restaurant",
    "Essence",
    "Autres",
    "Loisirs",
    "Transport",
    "Factures",
    "Courses en ligne",
    "Santé",
    "Voyages",
    "Éducation",
    "Cadeaux",
    "Services",
    "Frais bancaires",
    "Abonnements",
  ];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setIsDropdownOpen(false); // Ferme le dropdown après la sélection
  };

  return (
    <tr className="transaction">
      <td colSpan={2} style={{ textAlign: "left" }}>
        <div className="transaction-visible">
          <p>{formatDate(transaction.date)}</p>
        </div>
        <div className={`transaction-hidden ${isOpen ? "show" : "hide"}`}>
          <p>Transaction type</p>
          <p>Category</p>
          <p>Note</p>
        </div>
      </td>
      <td colSpan={2} style={{ textAlign: "left" }}>
        <div className="transaction-visible">
          <p>{transaction.place}</p>
        </div>
        <div className={`transaction-hidden ${isOpen ? "show" : "hide"}`}>
          <p>{transaction.transactionType}</p>
          <p className="p-with-select">
            {selectedCategory}{" "}
            <span onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ cursor: "pointer" }}
              />
            </span>
            {isDropdownOpen && (
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-dropdown"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </p>
          <p>
            {isEditingNote ? (
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onBlur={() => setIsEditingNote(false)}
                className="note-input"
              />
            ) : (
              <span
                onClick={() => setIsEditingNote(true)}
                style={{ cursor: "pointer" }}
              >
                {note}
              </span>
            )}
            <FontAwesomeIcon
              icon={faPencilAlt}
              style={{ cursor: "pointer", marginLeft: "5px" }}
              onClick={() => setIsEditingNote(true)}
            />
          </p>
        </div>
      </td>
      <td className="amount">{transaction.amount}</td>
      <td className="balance">{transaction.balance}</td>
      <td
        className="toggle-icon-td"
        onClick={toggleDetails}
        style={{ cursor: "pointer" }}
      >
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="toggle-icon"
        />
      </td>
    </tr>
  );
};

const AccountDetail = ({ transactions }) => (
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
      {transactions.map((transaction) => (
        <TransactionDetail
          key={transaction.id || uuidv4()}
          transaction={transaction}
        />
      ))}
    </tbody>
  </table>
);

export default AccountDetail;

