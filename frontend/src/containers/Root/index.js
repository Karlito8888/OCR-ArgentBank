import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Root = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

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
