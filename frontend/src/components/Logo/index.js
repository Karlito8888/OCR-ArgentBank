// src/components/Logo.js

import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Logo = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="logo-and-title">
      <img
        src={
          isLoggedIn
            ? "/assets/images/logoArgentBank.png"
            : "/assets/images/argentBankLogo.png"
        }
        alt="Logo Argent Bank"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </div>
  );
};

export default Logo;
