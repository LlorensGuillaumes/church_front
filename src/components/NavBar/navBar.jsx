import React, { useState } from "react";
import "./navBar.css";
const NavBar = ({
  setFilter,
  setPrincipalView,
  setSelectedChurch,
  setDataType,
}) => {
  const [buttonText, setButtonText] = useState("INTRODUIR NOVA ESGLÈSIA");

  const fnOpcionesFiltro = () => {
    setFilter("filter");
  };

  const fnViewNewChurch = () => {
    if (buttonText === "INTRODUIR NOVA ESGLÈSIA") {
      setPrincipalView("newChurch");
      setButtonText("SORTIR SENSE GUARDAR");
      setSelectedChurch("");
    } else if (buttonText === "SORTIR SENSE GUARDAR") {
      setPrincipalView("map");
      setButtonText("INTRODUIR NOVA ESGLÈSIA");
      setDataType("exist");
      setSelectedChurch("");
    }
  };

  return (
    <div className="navBar">
      <div className="pageTitle">
        <h1>TURISME ARQUITECTÒNIC</h1>
      </div>
      <div className="navBarButtons">
        <div className="leftButtons">
          <button onClick={fnOpcionesFiltro} className="btnNavbar">
            FILTRAR
          </button>
          <button onClick={fnViewNewChurch} className="btnNavbar">
            {buttonText}
          </button>
        </div>
        <div className="rightButtons">
          <button className="btnNavbar">LOGIN</button>
        </div>
      </div>
    </div>
  );
};

//<p key = {item._id} > {item.churchDetail}</p>
export default NavBar;
