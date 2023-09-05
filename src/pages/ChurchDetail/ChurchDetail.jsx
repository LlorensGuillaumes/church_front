import React, { useEffect, useState } from "react";
import "./ChurchDetail.css";
import Carrousel from "../../components/Carrousel/Carrousel";
import api from "../../shared/API/Api";
import estrellaBlanca from "../../components/Images/estrellaBlanca.png";
import logoGoogleMaps from '../../components/Images/logoGoogleMaps.png';
import logoWebLink from '../../components/Images/enlaceWebIcon.jpeg'
import estrella from "../../components/Images/estrella.png";
import { connect } from "react-redux";
import { selectUser } from "../../redux/users/selector";

const mapStateToProps = (state) =>{
  return{
    user: selectUser(state)
  }
}

const ChurchDetail = ({
  selectedChurch,
  setDataType,
  dataType,
  setStandOutDetailsData,
  setPrincipalView,
  setBuildingToModify,
  user,
  dataUser,
  setDataUser,
  isSmallScreen,
}) => {
  const [apiData, setApiData] = useState([]);
  const [imagesStates, setImageStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [isFavourite, setIsFavourite] = useState(false);
  const [voted, setVoted] = useState(false);
  const [descriptionExtend, setDescriptionExtend] = useState(false);

  let churchName = "";
  let churchDescription = "";
  let churchTown = "";
  let churchProvince = "";
  let churchGoogleMapsLink = "";
  let churchArchitectonicStyle = [];
  let churchCentury = [];
  let churchImages = [];
  let churchweb = "";
  let churchProperty = "";
  let churchOtherNames = [];
  let centuryList = "";

  useEffect(() => {
    if (dataUser && dataUser.favourites) {
      const idFavourties = dataUser.favourites.map((item) => item._id);
      if (idFavourties.includes(selectedChurch)) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }
  }, [dataUser, selectedChurch]);

  const toggleImage = (index) => {
    const initialStates = Array(imagesStates.length).fill(false);
    const updatedStates = initialStates.map((state, i) => {
      if (i <= index) {
        return true;
      }
      return state;
    });
    setImageStates(updatedStates);
  };

  useEffect(() => {
    if (selectedChurch) {
      setDataType("exist");

      api
        .get(`/churches/id/${selectedChurch}`)
        .then((response) => {
          setApiData(response);
          setStandOutDetailsData(response[0].churchDetail);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedChurch, setDataType, setStandOutDetailsData]);

  if (apiData.length > 0) {
    churchName = apiData[0].name;
    churchDescription = apiData[0].description;
    churchTown = apiData[0].townLocation;
    churchProvince = apiData[0].Province;
    churchGoogleMapsLink = `https://www.google.com/maps/place/${apiData[0].locationGPS[0]},${apiData[0].locationGPS[1]}`;
    churchArchitectonicStyle = apiData[0].architectonicStyle;
    churchCentury = apiData[0].century;
    churchImages = apiData[0].images;
    churchweb = apiData[0].web;
    churchProperty = apiData[0].property;
    churchOtherNames = churchName.slice(1);
    centuryList = { churchCentury }.churchCentury.toString();
  }

  const fnModifyBuilding = () => {
    setBuildingToModify(apiData);
    setPrincipalView("buildingModify");
  };

  const fnAddValoration = () => {
    const note = imagesStates.filter((item) => item === true).length;

    api.put(`/churches/addPuntuation/${note}/${selectedChurch}`);

    const modifiedDataUser = {
      ...dataUser,
      votes: {
        build: selectedChurch,
      },
    };

    setDataUser(modifiedDataUser);

    api.put(`/userData/edit/${dataUser._id}/`, dataUser);

    setVoted(true);
  };

  const fnAddFaovourites = () => {
    if (!isFavourite) {
      const arrFavourites = dataUser.favourites;
 
      arrFavourites.push(selectedChurch);
;

      const modifiedDataUser = {
        ...dataUser,
        favourites: arrFavourites,
      };

      api.put(`/userData/edit/${dataUser._id}/`, modifiedDataUser).then(() => {
        api.get(`/userData/userId/${user._id}`).then((response) => {
          setDataUser(response[0]);
        });
      });
    } else {
      const arrFavourites = dataUser.favourites;
      const indexId = arrFavourites.indexOf(selectedChurch);
      arrFavourites.splice(indexId, 1);

      const modifiedDataUser = {
        ...dataUser,
        favourites: arrFavourites,
      };

      setDataUser(modifiedDataUser);

      api.put(`/userData/edit/${dataUser._id}/`, dataUser).then(() => {});
    }
  };
console.log(user)
  return (
    <div className="detailDiv">
      {user && (user.rol === "AD" || user.rol === "SA") ? (
        <div className="btnAdmin">
          <button
            onClick={() => {
              fnModifyBuilding();
            }}
            className="btnNavbar"
          >
            MODIFICAR
          </button>
        </div>
      ) : null}
      <div className="info">
        {user.mail ? (
          <div className="addPuntuation">
            {imagesStates.map((isEstrellaVisible, index) => (
              <div
                key={index}
                className="AddPuntuationContainer"
                onClick={() => toggleImage(index)}
              >
                <img
                  src={isEstrellaVisible ? estrella : estrellaBlanca}
                  alt="estrella"
                  className="addPuntuationItem"
                />
              </div>
            ))}
            {!voted && (
              <button onClick={() => fnAddValoration()} className="btnNavbar btnSaveValoration">
                Guardar
              </button>
            )}
          </div>
        ) : (
          <div className="loggeate">
            <div className="AddPuntuationContainer">
              <img
                src={estrella}
                alt="estrella"
                className="addPuntuationItem"
              />
            </div>
            <div className="text">
              <h3>Entra al teu perfil per valorar</h3>
            </div>
          </div>
        )}
        {isSmallScreen && (
          <div className="btnShowDetails">
            <button
              className="btnNavbar"
              onClick={() => setPrincipalView("StandOut")}
            >
              Veure detalls
            </button>
          </div>
        )}

        <div className="buildingTitle">
          <div className="name_faovourites">
            <h2 className="principalName">{churchName[0]}</h2>
            <div>
              {user.mail && (
                <div
                  className="addFovourites"
                  onClick={() => fnAddFaovourites()}
                >
                  <img
                    src={isFavourite ? estrella : estrellaBlanca}
                    alt="estrella"
                    className="addPuntuationItem"
                  />
                </div>
              )}
            </div>
          </div>
          {churchProvince !== "" ? (
            <p>
              {churchTown} ({churchProvince})
            </p>
          ) : (
            <p>{churchTown}</p>
          )}
          <div className="buildingDatas">
            {churchOtherNames && churchOtherNames.length > 0
              ? churchOtherNames.map((item) => <p key={item}>{item}</p>)
              : null}
            <div className="detailList">
              {churchArchitectonicStyle && churchArchitectonicStyle.length > 0
                ? churchArchitectonicStyle.map((item) => (
                    <p key={item}>{item}</p>
                  ))
                : null}
            </div>

            <div className="detailList">
              {centuryList ? <p>s.({centuryList})</p> : null}
            </div>
            <div className="contact">
              {churchProperty ? <p>Gestionada per: {churchProperty}</p> : null}
              {churchGoogleMapsLink ? (
                <a
                  href={churchGoogleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="googleMapsContainer">
                    <img src={logoGoogleMaps} alt="GoogleMaps" className="logoGoogleMaps" title="Obrir amb Google maps"/>

                  </div>
                </a>
              ) : null}
              {churchweb ? (
                <a href={churchweb} target="_blank" rel="noreferrer">
                <div className="googleMapsContainer">
                    <img src={logoWebLink} alt="GoogleMaps" className="logoGoogleMaps" title="Anar a la web"/>

                  </div>
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <p className={!descriptionExtend ? "description" : "descriptionExtend"}>
          {churchDescription}
        </p>
        <button
          className="showMore"
          onClick={() => setDescriptionExtend(!descriptionExtend)}
        >
          {!descriptionExtend ? "veure tot" : "veure menys"}
        </button>
      </div>
      <div className="caruselContainer">
        {churchImages && churchImages.length > 0 ? (
          <Carrousel carouselData={churchImages} dataType={dataType} />
        ) : null}
      </div>
    </div>
  );

  // return <div className="detailDiv"></div>;
};

export default connect(mapStateToProps)(ChurchDetail);
