import React, { useEffect, useState } from "react";
import "./ChurchDetail.css";
import Carrousel from "../../components/Carrousel/Carrousel";
import api from "../../shared/API/Api";

const ChurchDetail = ({
  selectedChurch,
  setDataType,
  dataType,
  setStandOutDetailsData,
  setPrincipalView,
  setBuildingToModify,
}) => {
  const [apiData, setApiData] = useState([]);

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
    const churchName = apiData[0].name;
    const churchDescription = apiData[0].description;
    const churchTown = apiData[0].townLocation;
    const churchProvince = apiData[0].Province;
    const churchGoogleMapsLink = `https://www.google.com/maps/place/${apiData[0].locationGPS[0]},${apiData[0].locationGPS[1]}`;
    const churchArchitectonicStyle = apiData[0].architectonicStyle;
    const churchCentury = apiData[0].century;
    const churchImages = apiData[0].images;
    const churchweb = apiData[0].web;
    const churchProperty = apiData[0].property;

    const churchOtherNames = churchName.slice(1);
    let centuryList = [];
    if (churchCentury) {
      centuryList = { churchCentury }.churchCentury.toString();
    }

    const fnModifyBuilding = () =>{
      setBuildingToModify(apiData)
      setPrincipalView('buildingModify')
    }
    return (
      <div className="detailDiv">
      <div>
        <button onClick={()=>{fnModifyBuilding()}}>MODIFICAR</button>
      </div>
        <div className="info">
       
          <h2 className="principalName">{churchName[0]}</h2>
          {churchProvince !== "" ? (
            <p>
              {churchTown} ({churchProvince})
            </p>
          ) : (
            <p>{churchTown}</p>
          )}

          {churchOtherNames && churchOtherNames.length > 0
            ? churchOtherNames.map((item) => <p key={item}>{item}</p>)
            : null}

          {churchArchitectonicStyle && churchArchitectonicStyle.length > 0
            ? churchArchitectonicStyle.map((item) => <p key={item}>{item}</p>)
            : null}

          {centuryList ? <p>s.({centuryList})</p> : null}

          {churchProperty ? <p>Gestionada per: {churchProperty}</p> : null}
          {churchGoogleMapsLink ? (
            <a
              href={churchGoogleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              googleMaps
            </a>
          ) : null}
          {churchweb ? (
            <a href={churchweb} target="_blank" rel="noreferrer">
              {" "}
              web: {churchName[0]}
            </a>
          ) : null}

          <p className="">{churchDescription}</p>
        </div>
        <div className="caruselContainer">
          {churchImages && churchImages.length > 0 ? (
            <Carrousel carouselData={churchImages} dataType={dataType} />
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="detailDiv"></div>;
};

export default ChurchDetail;
