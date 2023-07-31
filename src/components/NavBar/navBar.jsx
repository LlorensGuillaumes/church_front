import React from "react";

const NavBar = ({ setFilter }) => {

  const fnOpcionesFiltro = () => {
    setFilter('filter');
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
    </div>
  );
};

//<p key = {item._id} > {item.churchDetail}</p>
export default NavBar;
