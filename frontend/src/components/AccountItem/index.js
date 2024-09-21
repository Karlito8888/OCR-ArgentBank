import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import TransactionDetail from "../TransactionDetail";
import "./style.scss";

const AccountItem = ({ title, amount, description, details }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <section className="account">
      <div className="account-content">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta" onClick={handleToggle}>
          <button className="transaction-button">
            <FontAwesomeIcon
              icon={isOpen ? faX : faChevronRight}
              style={{ color: "#ffffff" }}
            />
          </button>
        </div>
      </div>
      <div
        className={`collapse-content ${isOpen ? "open" : ""}`}
        style={{ height: isOpen ? contentRef.current.scrollHeight : "0px" }}
        ref={contentRef}
      >
        <TransactionDetail transactions={details} />
      </div>
    </section>
  );
};

export default AccountItem;
