import React from "react";
import "./style.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <a href="/" className="home-link">
        Retour à l'accueil
      </a>
    </div>
  );
};

export default NotFound;
