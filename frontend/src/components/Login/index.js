// src/App.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./style.scss";
import Button from "../Button";

const Login = () => {
  const { isLoggedIn, userName, firstName } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="navbar-right">
      {isLoggedIn ? (
        // Affichage après connexion
        <div className="nav-items">
          <span className="nav-name" style={{ color: "#42b983" }}>
            {userName || firstName}
          </span>
          <FontAwesomeIcon
            icon={faCircleUser}
            size="2xl"
            style={{ color: "#42b983" }}
          />
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "#42b983" }}
            size="xl"
          />
          <Button onClick={handleLogout} className="icon-power">
            <FontAwesomeIcon
              icon={faPowerOff}
              style={{ color: "#42b983" }}
              size="2xl"
            />
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
          <span className="nav-sign">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Login;
