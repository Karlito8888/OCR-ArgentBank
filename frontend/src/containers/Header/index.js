import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import "./style.scss";
import Login from "../../components/Login";

const Header = () => {
  const location = useLocation();
  const isSpecialPage =
    location.pathname === "/user" ||
    location.pathname.startsWith("/transaction-detail");

  return (
    <header className={isSpecialPage ? "header-special" : ""}>
      <nav className="navbar">
        <ul className="navbar-left">
          <li>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </li>
        </ul>
        <Login />
      </nav>
    </header>
  );
};

export default Header;
