// src/components/Login.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Tooltip from "../Tooltip";
import {
  faPowerOff,
  faCircleUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "./style.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.user.userToken);
  const userInfo = useSelector((state) => state.user.userInfo);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Fonction pour gérer le clic sur l'icône des paramètres
  const handleSettingsClick = () => {
    navigate("/user", { state: { isEditing: true } });
  };

  return (
    <div className="navbar-right">
      {userToken ? (
        <div className="nav-items">
          <span className="nav-name">
            {userInfo?.userName || userInfo?.firstName || "Dear user"}
          </span>

          <Tooltip text="My Page">
            <Link to="/user" className="icon-user">
              <FontAwesomeIcon
                icon={faCircleUser}
                size="xl"
                className="icon"
                aria-label="User Profile"
              />
            </Link>
          </Tooltip>

          <Tooltip text="Edit Page">
            <FontAwesomeIcon
              icon={faGear}
              size="xl"
              className="icon"
              aria-label="Settings"
              onClick={handleSettingsClick}
            />
          </Tooltip>

          <Tooltip text="Logout">
            <Button onClick={handleLogout} className="icon-power">
              <FontAwesomeIcon
                icon={faPowerOff}
                size="2xl"
                className="icon"
                aria-label="Logout"
              />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Link to="/login" className="nav-items">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="xl"
            className="icon-login"
            aria-label="Login"
          />
          <span className="nav-sign">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Login;
