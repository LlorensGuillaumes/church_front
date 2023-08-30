import React, { useState } from "react";
import "./UserSettings.css";

const UserSettings = ({ setFilter, setPrincipalView }) => {
  const [changePaswordVisible, setChangePaswordVisible] = useState(false);
  const [languageVisible, setLanguageVisible ] = useState(false);

  return (
    <div>
      <div>
        <div onClick={() => setChangePaswordVisible(!changePaswordVisible)}>
          <h3>Canviar contrasenya</h3>
        </div>

        <div>
          {changePaswordVisible && (
            <div>
              <input placeholder="contrasenya actual" />
              <input placeholder="nova contrasenya" />
              <input placeholder="confirmar nova contrasenya" />
              <button className="btnNavbar">Guardar</button>
            </div>
          )}
        </div>
      </div>
      <div onClick={() => setPrincipalView("favourites")}>
        <h3>favorits</h3>
      </div>
      <div onClick={() => setLanguageVisible(!languageVisible)}>
          <h3>idioma</h3>
        </div>
        <div>
          {languageVisible && (
            <div>
              <select>
                <option>CAT</option>
                <option>ES</option>
                <option>EN</option>
              </select>
            </div>
          )}
        </div>
      <button
        onClick={() => {
          setFilter("listView");
          setPrincipalView("mapView");
        }}
        className="btnNavbar"
      >
        SORTIR
      </button>
    </div>
  );
};

export default UserSettings;
