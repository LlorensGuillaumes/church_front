import React, { useEffect, useState } from "react";
import "./Favourites.css";
import api from "../../shared/API/Api";

const Favourites = ({ dataUser, setDataUser, user }) => {

  const [favouritesData, setFavouritesData] = useState(dataUser.favourites);


  useEffect(() =>{
    setFavouritesData(dataUser.favourites);
  },[dataUser])

  const fnDeleteFavourite = (e) => {
    const arrIdFavourite = favouritesData.map((item) => item._id);

    const newArray = arrIdFavourite.filter((item) => item !== e);

    api
      .put(`/userData/edit/${dataUser._id}/`, { favourites: newArray })
      .then((response) => {
       

        api.get(`/userData/userId/${user._id}`).then((response) => {
         
          setDataUser(response[0]);
        })
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="favouritesList">
      {(favouritesData && favouritesData.length > 0)
        ? favouritesData.map((item, index) => (
            <div key={index} className="favouritesItem">
              <div className="dataContainer">
                <h3 className="favouriteName">{item.name[0]}</h3>
                <p>{item.townLocation}</p>
                <p>{item.province}</p>
                <button
                  className="btnNavbar"
                  onClick={() => {
                    fnDeleteFavourite(item._id);
                  }}
                >
                  Eliminar
                </button>
              </div>

              <div className="favouritesImgContainer">
                <img
                  className="favouritesImg"
                  src={`http://localhost:5000/churches/getImages/${item.images[0]}`}
                  alt={item.id}
                />
              </div>
            </div>
          ))
        : <h3 className="noFavourites">Encara no tens favorits</h3>}
    </div>
  );
};

export default Favourites;
