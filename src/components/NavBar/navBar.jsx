import React, { useState } from "react";
import { connect } from "react-redux";
import { connectUser } from "../../redux/users/conectors";
import { login } from "../../redux/users/usersActions";
import { logout } from "../../redux/users/usersActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../shared/API/Api";
import "./navBar.css";
import lupa from "../../components/Images/lupa.png";

const NavBar = ({
  setFilter,
  filter,
  setPrincipalView,
  principalView,
  setSelectedChurch,
  user,
  setUser,
  setDataFiltered,
  apiData,
  register,
  setRegister,
  btnFilterText,
  setBtnFilteText,
  setDataUser,
  isSmallScreen,
  dataUser,
  loginUser,
  logoutUser,
  actualLocation,
  SetActualLocation,
}) => {
  const [inputUser, SetInputUser] = useState("");
  const [inputPasword, SetInputPasword] = useState("");
  const [selectedValue, setSelectedValue] = useState("admin");
  const [listTownVisible, setListTownVisible] = useState(false);
  const [errorAutenticate, setErrorAutenticate] = useState([false, ""]);
  const [loginVisible, setLoginVisible] = useState(false);
  const [btnLoginVisible, setBtnLoginVisible] = useState(true);

  const dataToFiltered = [...apiData];

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
    if (!user.mail) {
      const loginData = {
        mail: inputUser,
        password: inputPasword,
      };

      api
        .post("/users/login", loginData)
        .then(async (response) => {
          if (response.userDB) {
            localStorage.setItem("token", response.token);
            loginUser(response.userDB);
            setBtnLoginVisible(false);

            api
              .get(`/userData/userId/${response.userDB._id}`)
              .then((response) => {
                setDataUser(response[0]);
              });
          } else {
            if (response.error === "usuari no trobat") {
              setErrorAutenticate([true, "usuari no trobat"]);
            } else if (response.error === "error al logejar usuari") {
              setErrorAutenticate([true, "contrasenya errònia"]);
            } else {
              setErrorAutenticate([true, "error servidor"]);
              console.log("Error en la llamada a la API:", response.error);
            }
          }
        })
        .catch((error) => {
          setErrorAutenticate(true);
          console.log("Error en la llamada a la API:", error);
        });
    }

    SetInputUser("");
    SetInputPasword("");
  };

  const handleSelectedChange = (selectedValue) => {
    if (selectedValue === "newBuilding") {
      setSelectedValue("admin");
      fnViewNewChurch();
    } else if (selectedValue === "admin") {
    } else if (selectedValue === "list") {
    } else {
    }
  };

  const [town, setTown] = useState('');
  const [townsData, setTownsData] = useState([]);
  const arrTownData = [];

  for (const townData of townsData) {
    const townItem = townData.display_name.split(",");
    const objTown = {
      name: townItem[0],
      country: townItem[townItem.length - 1],
      zona: townItem[townItem.length - 3],
      ubication: [townData.lat, townData.lon],
    };
    arrTownData.push(objTown);
  }

  const fnMapCenter = () => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${town}`)
      .then((response) => response.json())
      .then((data) => setTownsData(data))

      .catch((error) => {
        console.log(error);
      });

    setListTownVisible(true);
  };

  const fnTownClick = (item) => {
    setDataFiltered((prevDataFiltered) => ({
      ...prevDataFiltered,
      center: item.ubication,
      zoom: 12,
      data: dataToFiltered,
    }));
    SetActualLocation(item.ubication);
    setListTownVisible(false);
    if(isSmallScreen){
      setPrincipalView("listView");
    } else{
      setPrincipalView('mapView')
      setFilter('listView')
    }
    
    arrTownData.length = 0;
  };

  const fnReintentar = () => {
    setErrorAutenticate([false, ""]);
    setUser(false);
  };

  const fnRegister = () => {
    setRegister(false);
    setLoginVisible(false);
    if (isSmallScreen) {
      principalView !== "register"
        ? setPrincipalView("register")
        : setPrincipalView("listView");
    } else {
      filter !== "register" ? setFilter("register") : setFilter("listView");
    }
  };

  return (
    <div className="navBar">
      {btnLoginVisible && (
        <div className="rightButtons">
          <button
            onClick={() => {
              setLoginVisible(!loginVisible);
              setPrincipalView("listView");
            }}
            className="btnNavbar btnLogin"
          >
            Inicia sessió
          </button>

          <button onClick={() => fnRegister()} className="btnNavbar btnLogin">
            Registra't
          </button>
        </div>
      )}

      {loginVisible && (
        <div className="rightButtons">
          {user.mail ? (
            <div className="dataLogin">
              <p
                className="loginName"
                onClick={() => {
                  isSmallScreen
                    ? setPrincipalView("userSettings")
                    : setFilter("userSettings");
                }}
              >
                {" "}
                {user.mail}{" "}
              </p>
              <FontAwesomeIcon
                icon={faUser}
                className="loginIconLoggedIn"
                title="tancar sessió"
                onClick={() => {
                  loginUser(logout());
                  setUser();
                  setPrincipalView("mapView");
                  setFilter("listView");
                  setLoginVisible(false);
                  setBtnLoginVisible(true);
                }}
              />
            </div>
          ) : !user.mail && !errorAutenticate[0] ? (
            <div className="dataLogin">
              <input
                type="text"
                placeholder="mail"
                className="logInput"
                value={inputUser}
                onChange={(e) => SetInputUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="logInput"
                value={inputPasword}
                onChange={(e) => SetInputPasword(e.target.value)}
              />

              {!register ? (
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className="loginIconLoggedOut"
                  title="Inciar sessió"
                  onClick={fnLogin}
                />
              ) : null}
            </div>
          ) : errorAutenticate[0] ? (
            <div>
              <p className="errorMesageLogIn">
                {(() => {
                  switch (errorAutenticate[1]) {
                    case "usuari no trobat":
                      return "Usuari no trobat";
                    case "contraseña errònia":
                      return "Contrasenya errònia";
                    default:
                      return "error de logIn";
                  }
                })()}
              </p>

              {errorAutenticate[1] === "usuari no trobat" && (
                <div className="dataLogin">
                  <button className="btnNavbar" onClick={() => fnReintentar()}>
                    Reintentar
                  </button>
                  <button className="btnNavbar" onClick={() => fnRegister()}>
                    Registrar
                  </button>
                </div>
              )}
              {errorAutenticate[1] === "contrasenya errònia" && (
                <div className="dataLogin">
                  <button className="btnNavbar" onClick={() => fnReintentar()}>
                    Reintentar
                  </button>
                </div>
              )}
              {errorAutenticate[1] !== "usuari no trobat" &&
                errorAutenticate[1] !== "contrasenya errònia" && (
                  <div className="dataLogin">
                    <button
                      className="btnNavbar"
                      onClick={() => fnReintentar()}
                    >
                      Reintentar
                    </button>
                  </div>
                )}
            </div>
          ) : null}
        </div>
      )}
      <div>
        <div className="findByTown">
          <input
            className="inputFindTown"
            placeholder="On anem?"
            value={town}
            onChange={(e) => {
              setTown(e.target.value);
            }}
          />
          <button
            className="btnFindTown"
            onClick={() => {
              fnMapCenter();
            }}
          >
            <img src={lupa} alt="lupa" onClick={()=>setTown("")}/>
          </button>

          <div>
            {listTownVisible && arrTownData && arrTownData.length > 0 ? (
              <div className="townList">
                {arrTownData.map((item, index) =>
                  item.ubication.length > 0 ? (
                    <div
                      key={index}
                      className="townDataItems"
                      onClick={() => {
                        fnTownClick(item);
                      }}
                    >
                      <div className="townDataNames">
                        <p>
                          {item.name}, {item.zona}
                        </p>
                      </div>
                      <p>{item.country}</p>
                    </div>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="navBarButtons">
        <div className="leftButtons">
          <button
            className="btnNavbar"
            onClick={() => {
              isSmallScreen
                ? setPrincipalView("mapView")
                : setPrincipalView("mapView");
              !isSmallScreen && setFilter("listView");
            }}
          >
            MAPA
          </button>
          <button
            onClick={() => {
              isSmallScreen
                ? setPrincipalView("listView")
                : setPrincipalView("mapView");
              !isSmallScreen && setFilter("listView");
            }}
            className="btnNavbar"
          >
            LLISTAT
          </button>

          <button
            onClick={() => {
              isSmallScreen
                ? setPrincipalView("filter")
                : setPrincipalView("mapView");
              !isSmallScreen && setFilter("filter");
            }}
            className="btnNavbar"
          >
            FILTRAR
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

export default connectUser(NavBar);
