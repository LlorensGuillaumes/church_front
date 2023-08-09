import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../shared/API/Api";
import "./navBar.css";

const NavBar = ({
  setFilter,
  setPrincipalView,
  setSelectedChurch,
  setDataType,
  user,
  setUser,
  setStandOutDetailsView,
}) => {
  const [buttonText, setButtonText] = useState("INTRODUIR NOVA ESGLÈSIA");
  const [inputUser, SetInputUser] = useState("");
  const [inputPasword, SetInputPasword] = useState("");

  const fnOpcionesFiltro = () => {
    setFilter("filter");
  };

  if (!user) {
    if (localStorage.tokken) {
      api
        .get("/users")
        .then((response) => {
          setUser(response[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const fnViewNewChurch = () => {
    if (buttonText === "INTRODUIR NOVA ESGLÈSIA") {
      setPrincipalView("newChurch");
      setButtonText("SORTIR SENSE GUARDAR");
      setSelectedChurch("");
      setStandOutDetailsView(false);
    } else if (buttonText === "SORTIR SENSE GUARDAR") {
      setPrincipalView("map");
      setButtonText("INTRODUIR NOVA ESGLÈSIA");
      setDataType("exist");
      setSelectedChurch("");
    }
  };

  const fnLogin = () => {
    console.log(user);
    if (!user) {
      const loginData = {
        mail: inputUser,
        password: inputPasword,
      };

      console.log(loginData);
      api
        .post("/users/login", loginData)
        .then((response) => {
          localStorage.setItem("token", response.token);
          setUser(response.UserDB);
        })
        .catch((error) => {});
    } else {
      setUser(null);
      localStorage.removeItem("tokken");
    }
  };

  return (
    <div className="navBar">
      <div className="rightButtons">
        {user ? (
          <div>
            <p> {user.mail} </p>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="mail"
              className="logInput"
              onChange={(e) => SetInputUser(e.target.value)}
            />
            <input
              type="text"
              placeholder="pasword"
              className="logInput"
              onChange={(e) => SetInputPasword(e.target.value)}
            />
          </div>
        )}

        <button className="btnNavbar" onClick={fnLogin}>
          {user ? (
            <FontAwesomeIcon
              icon={faUser}
              className="loginIconLoggedIn"
              title="tancar sessió"
            />
          ) : (
            <FontAwesomeIcon
              icon={faSignInAlt}
              className="loginIconLoggedOut"
              title="Inciar sessió"
            />
          )}
        </button>
      </div>

      <div className="pageTitle">
        <h1>TURISME ARQUITECTÒNIC</h1>
      </div>
      <div className="navBarButtons">
        <div className="leftButtons">
          <button onClick={fnOpcionesFiltro} className="btnNavbar">
            FILTRAR
          </button>
          {!user ? null : user.rol === "AD" || user.rol === "SA" ? (
            <button onClick={fnViewNewChurch} className="btnNavbar">
              {buttonText}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

//<p key = {item._id} > {item.churchDetail}</p>
export default NavBar;
