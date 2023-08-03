import React, { useState } from "react";

const NavBar = ({ setFilter, setPrincipalView }) => {

const [buttonText, setButtonText] = useState ("INTRODUIR NOVA ESGLÈSIA");

  const fnOpcionesFiltro = () => {
    setFilter('filter');
  }

  const fnViewNewChurch = () => {
    if (buttonText === "INTRODUIR NOVA ESGLÈSIA") {
      setPrincipalView('newChurch');
      setButtonText('SORTIR SENSE GUARDAR');
    } else if(buttonText === "SORTIR SENSE GUARDAR"){
      setPrincipalView('map');
      setButtonText('INTRODUIR NOVA ESGLÈSIA')
    };

    
  }

  return (
    <div>

      {/* {apiData.map((item) => (
        item.churchDetail.map((detail) => (
          <p key = {detail._id}>{detail.detailType}</p>
        ))
        
      ))} */}
     
      <h1> Yo soy el Navbar </h1>
      <button onClick={fnOpcionesFiltro}>FILTRAR</button>
      <button onClick={fnViewNewChurch}>{buttonText}</button>
    </div>
  );
};

//<p key = {item._id} > {item.churchDetail}</p>
export default NavBar;
