import React from 'react';
import { useLocation } from 'react-router-dom';
import "./style.scss";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Détecter si on est sur la page d'accueil

  return (
    <footer className={`footer ${isHomePage ? "footer--bordered" : ""}`}>
      <p className="footer-text">Copyright 2024 Argent Bank</p>
    </footer>
  );
};

export default Footer;