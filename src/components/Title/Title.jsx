import React from "react";
import './Title.css'
import logo from '../Images/Logo.png'
const Title = () => {
  return (
    <div className="pageTitle">
    <div className="logoContainer">
      <img className="log" src={logo} alt="logo"/>
    </div>
    
      <h1 className="titleH1">BeepBUILDING</h1>
    </div>
  );
};

export default Title;
