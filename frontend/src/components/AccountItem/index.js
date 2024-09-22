import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import TransactionDetail from "../TransactionDetail";
import "./style.scss";

const AccountItem = ({ title, amount, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  // Evite de créer une nouvelle fonction à chaque rendu.

  return (
    <section className="account">
      <div className="account-content">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={handleToggle}
            aria-expanded={isOpen}
          >
            <FontAwesomeIcon icon={isOpen ? faX : faChevronRight} />
          </button>
        </div>
      </div>
      <div className={`collapse-content ${isOpen ? "open" : ""}`}>
        <TransactionDetail transactions={details} />
      </div>
    </section>
  );
};

export default AccountItem;

