import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import { getUserProfile } from "../../redux/authSlice";

const Root = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: isLoginPage ? "#12002b" : "white",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
