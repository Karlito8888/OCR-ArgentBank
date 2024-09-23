import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
    return { ...rest, date: `${day}/${month}/${year}` };
  });

const TransactionDetail = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category
  );
  const [isEditingNote, setIsEditingNote] = useState(false); // État pour gérer l'édition de la note
  const [note, setNote] = useState("lorem ipsum"); // État pour la note

  const toggleDetails = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <>
      <tr className="transaction">
        <td colSpan={2} style={{ textAlign: "left" }}>
          <div className="transaction-visible">
            <p>{transaction.date}</p>
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
                  onChange={handleNoteChange}
                  onBlur={() => setIsEditingNote(false)} // Ferme l'input quand il perd le focus
                  className="note-input" // Ajout de la classe CSS
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
                onClick={() => setIsEditingNote((prev) => !prev)} // Permet de commencer l'édition en cliquant sur l'icône
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
        {formattedTransactions.map((transaction) => (
          <TransactionDetail key={uuidv4()} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
};

export default AccountDetail;

