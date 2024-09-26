import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const AccountItem = ({ id, title, amount, description, details }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); 

  return (
    <section
      className="account"
      onClick={() =>
        navigate(`/transaction-detail/${id}`, {
          state: { account: { id, title, amount, description, details } },
        })
      }
    >
      <div className="account-content">
        <div className="account-content-wrapper">
          <h3 className="account-title">{title}</h3>
          <p className="account-amount">{amount}</p>
          <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          {/* Ajouter un gestionnaire d'événement pour le clic sur faX */}
          {pathname.includes("/transaction-detail") ? (
            <FontAwesomeIcon
              icon={faX}
              onClick={(e) => {
                e.stopPropagation(); // Empêche le clic sur le faX d'exécuter l'événement parent
                navigate("/user"); 
              }}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <FontAwesomeIcon icon={faChevronRight} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountItem;
