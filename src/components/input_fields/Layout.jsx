import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="mx-4 my-4 sm:mx-12">
    <Outlet />
  </div>
);

export default Layout;
