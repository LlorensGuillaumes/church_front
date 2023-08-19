import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../shared/API/Api";
import "./navBar.css";

const NavBar = ({
  setFilter,
  setPrincipalView,
  setSelectedChurch,
  user,
  setUser,
}) => {
  const [inputUser, SetInputUser] = useState("");
  const [inputPasword, SetInputPasword] = useState("");
  const [btnFilterText, setBtnFilteText] = useState("FILTRAR");
  const [selectedValue, setSelectedValue] = useState("admin")

  const fnOpcionesFiltro = () => {
    if (btnFilterText === "FILTRAR") {
      setFilter("filter");
      setBtnFilteText("VEURE LLISTAT");
    } else if (btnFilterText === "VEURE LLISTAT") {
      setFilter("listView");
      setBtnFilteText("FILTRAR");
    }
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
    setPrincipalView("newChurch");
    setSelectedChurch("");
  };

  const fnLogin = () => {


    if (!user) {
      const loginData = {
        mail: inputUser,
        password: inputPasword,
      };

      api
        .post("/users/login", loginData)
        .then((response) => {
   
          localStorage.setItem("token", response.token);
      
          setUser(response.userDB);
        })
        .catch((error) => {});
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  };
  
    

    const handleSelectedChange = (selectedValue) => {
    if (selectedValue === "newBuilding") {
      setSelectedValue('admin')
      fnViewNewChurch();
      
    } else if (selectedValue === "admin") {
    } else if (selectedValue === "list") {
    } else {
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
              placeholder="admin@admin.com"
              className="logInput"
              onChange={(e) => SetInputUser(e.target.value)}
            />
            <input
              type="text"
              placeholder="admin1234@"
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
        <h1>BeepBUILDING</h1>
      </div>
      <div className="navBarButtons">
        <div className="leftButtons">
          <button onClick={fnOpcionesFiltro} className="btnNavbar">
            {btnFilterText}
          </button>
          <button
            className="btnNavbar"
            onClick={() => {
              setPrincipalView("mapView");
            }}
          >
            MAPA
          </button>
          {user && (user.rol === "AD" || user.rol === "SA") && (
            <select
              className="droboxNavbar"
              value={selectedValue}
              onChange={(e) => handleSelectedChange(e.target.value)}
            >
              <option value="admin" className="btnNavbarDp">
                ADMIN
              </option>
              <option value="newBuilding" className="btnNavbarDp">
                NOU EDIFICI
              </option>
              <option value="Listats" className="btnNavbarDp">
                LLISTATS
              </option>
            </select>
          )}
        </div>
      </div>
    </div>
  );
};


export default NavBar;
