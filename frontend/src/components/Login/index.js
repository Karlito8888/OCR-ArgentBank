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
import Button from "../Button";
import Tooltip from "../Tooltip";
import "./style.scss";

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

  const handleSettingsClick = () => {
    navigate("/user", { state: { isEditing: true } });
  };

  return (
    <div className="navbar-right">
      {isLoggedIn ? (
        <div className="nav-items">
          <span className="nav-name">{userName || firstName}</span>
          <Tooltip text="My Page">
            <Link to="/user" className="icon-user">
              <FontAwesomeIcon
                icon={faCircleUser}
                size="xl"
                style={{ color: "#42b983" }}
                aria-label="User Profile"
              />
            </Link>
          </Tooltip>
          <Tooltip text="Edit Page">
            <FontAwesomeIcon
              icon={faGear}
              size="xl"
              className="icon-settings"
              style={{ color: "#42b983" }}
              aria-label="Settings"
              onClick={handleSettingsClick}
            />
          </Tooltip>
          <Tooltip text="Logout">
            <Button onClick={handleLogout} className="icon-power">
              <FontAwesomeIcon
                icon={faPowerOff}
                size="2xl"
                style={{ color: "#42b983" }}
                aria-label="Logout"
              />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Link to="/login" className="nav-items">
          <FontAwesomeIcon
            icon={faCircleUser}
            size="lg"
            className="icon-login"
            style={{ color: "darkgray" }}
            aria-label="Login"
          />
          <span className="nav-sign">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default Login;
