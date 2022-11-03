import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {


  return (
    <>
      <div className="linkRoutes">

        <Link to="/home"> Home</Link>

        <Link to="/favorites"> Favorites</Link>

        <Link to="/login"> Login</Link>

        <Link to="/account"> Account</Link>

      </div>
    </>
  )
};
export default NavigationBar;