// src/App.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./style.scss";
import Button from "../Button";

const Login = () => {
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-right">
      {isLoggedIn ? (
        // Affichage après connexion
        <div className="nav-items">
          <span>{username}</span>
          <FontAwesomeIcon
            icon={faCircleUser}
            size="lg"
            style={{ color: "#42b983" }}
          />
          <FontAwesomeIcon icon={faGear} />
          <Button onClick={handleLogout} className="icon-power">
            <FontAwesomeIcon icon={faPowerOff} />
          </Button>
        </div>
      ) : (
        // Affichage avant connexion
        <Link to="/login" className="nav-items">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="lg"
            style={{ color: "#2c3e50" }}
          />
          <span>Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Login;
