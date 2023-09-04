import React, { useState } from "react";
import "./UserSettings.css";
import api from "../../shared/API/Api";

const UserSettings = ({ 
  setFilter, 
  setPrincipalView,
  user,
}) => {
  const [changePaswordVisible, setChangePaswordVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const [oldPasword, setOldPasword] = useState('');
  const [newPasword, setNewPasword] = useState('');
  const [confirmPasword, setConfirmPasword] = useState('');
  const [error, setError] = useState(false);
  

  const fnChangePasword = () =>{
  

    if(newPasword !== confirmPasword){
      setError(true);
    } else {
      const newData = {
        oldPasword: oldPasword,
        newPasword: newPasword,
      }
      api.put(`/users/userModify/${user._id}`, newData)
        .then((response) =>{
          if(response.ok){
            setChangePaswordVisible(false);
          }
        })
      
    }

  }

  return (
    <div className="userMenuItemContain">
      <div
        onClick={() => setPrincipalView("favourites")}
        className="userMenuItem"
      >
        <h3 className="userMenuItemText">favorits</h3>
      </div>
      <div className="userMenuItem">
        <div
          onClick={() => setChangePaswordVisible(!changePaswordVisible)}
          className="userMenuItemText"
        >
          <h3 className="userMenuItemText">Canviar contrasenya</h3>
        </div>

        {changePaswordVisible && (
          <div className="changePaswordContainer">
          {error && (
            <p>Les contrasenyes no coincideixen</p>
          )
          }
            <input 
              placeholder="contrasenya actual" 
              className="inputPaswordChange"
              onChange={(e)=>setOldPasword(e.target.value)}
              />
            <input 
              placeholder="nova contrasenya" 
              className="inputPaswordChange"
              onChange={(e)=>setNewPasword(e.target.value)}
              />
            <input 
              placeholder="confirmar contrasenya" 
              className="inputPaswordChange"
              onChange={(e) => setConfirmPasword(e.target.value)}
              />
            <button 
              className="btnNavbar changePasword"
              onClick={()=>{fnChangePasword()}}>Canviar</button>
          </div>
        )}
      </div>
      <div
        onClick={() => setLanguageVisible(!languageVisible)}
        className="userMenuItem"
      >
        <h3 className="userMenuItemText">Idioma</h3>
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
      <div
        className="userMenuItem"
        onClick={() => {
          setFilter("listView");
          setPrincipalView("mapView");
        }}
      >
        <h3 className="userMenuItemText">Sortir</h3>
      </div>
    </div>
  );
};

export default UserSettings;
