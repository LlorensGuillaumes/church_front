import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import api from "../../shared/API/Api";
import "./navBar.css";
import lupa  from '../../components/Images/lupa.png'

const NavBar = ({
  setFilter,
  setPrincipalView,
  principalView,
  setSelectedChurch,
  user,
  setUser,
  setDataFiltered,
  apiData
}) => {
  const [inputUser, SetInputUser] = useState("");
  const [inputPasword, SetInputPasword] = useState("");
  const [btnFilterText, setBtnFilteText] = useState("FILTRAR");
  const [selectedValue, setSelectedValue] = useState("admin");
  const [listTownVisible, setListTownVisible] = useState(false);

  const dataToFiltered = [...apiData];
  

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

  const fnViewMap = () => {
    setPrincipalView("mapView");
    setFilter('listView');
  }
  
  const [town, setTown] = useState([]);
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

      setListTownVisible(true)
  };

  const fnTownClick = (item) => {
    setDataFiltered((prevDataFiltered) => ({
      ...prevDataFiltered,
      center: item.ubication,
      zoom: 10,
      data: dataToFiltered,
    }));
    setListTownVisible(false)
    arrTownData.length = 0
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
    <div>
    <div className="findByTown">
              <input
                className="inputFindTown"
                placeholder="On anem?"
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
                <img src={lupa} alt="lupa"/>
              </button>

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


      <div className="navBarButtons">
        <div className="leftButtons">
        {principalView === 'mapView' ? 
        <button onClick={fnOpcionesFiltro} className="btnNavbar">
            {btnFilterText}
          </button> : null}
          
          <button
            className="btnNavbar"
            onClick={() => {
              fnViewMap();
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
