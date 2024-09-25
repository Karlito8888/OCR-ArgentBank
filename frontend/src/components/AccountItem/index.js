import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const AccountItem = ({ title, amount, description, details }) => {

  return (
    <section 
    className="account" 
    // onClick={handleNavigate}
    >
      <div className="account-content">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <FontAwesomeIcon
            icon={
              // isTransactionDetailPage ? faX : 
              faChevronRight}
          />
        </div>
      </div>
    </section>
  );
};

export default AccountItem;
