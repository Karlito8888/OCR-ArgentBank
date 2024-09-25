// src/components/Logo.js
import React from "react";
import "./style.scss";

const Logo = () => {

  return (
    <div className="logo-and-title">
      {/* <img
        src={
          isLoggedIn
            ? 
            "/assets/images/logoArgentBank.png"
            : "/assets/images/argentBankLogo.png"
        }
        alt="Logo Argent Bank"
      /> */}
      <h1 className="sr-only">Argent Bank</h1>
    </div>
  );
};

export default Logo;
