import React, { useEffect, useState } from "react";
import "./ChurchDetail.css";
import Carrousel from "../../components/Carrousel/Carrousel";

const ChurchDetail = ({ selectedChurch, preViewNewChurch }) => {
  const [apiData, setApiData] = useState([]);



  useEffect(() => {
    if (selectedChurch) {
      fetch("http://localhost:5000/churches/id/" + selectedChurch)
        .then((res) => res.json())
        .then((result) => setApiData(result))
        .catch((error) => console.log(error));
    }
  }, [selectedChurch]);

  useEffect(() => {
  
    if (preViewNewChurch.length > 0) {
    
      setApiData(preViewNewChurch);
    }
  }, [preViewNewChurch]);


  if (apiData.length > 0) {
    const churchName = apiData[0].name; //es []
    const churchDescription = apiData[0].description;
    const churchTown = apiData[0].townLocation;
    const churchProvince = apiData[0].churchProvince;
    const churchGoogleMapsLink = "https://www.google.es/";
    const churchArchitectonicStyle = apiData[0].architectonicStyle; //es[]
    const churchCentury = apiData[0].century; //es []
    const churchImages = apiData[0].images; //es[]
    const churchweb = apiData[0].web;
    const churchProperty = apiData[0].property;

    const churchOtherNames = churchName.slice(1);
    // console.log(churchDescription)
    let centuryList = [];
    if (churchCentury) {
      centuryList = { churchCentury }.churchCentury.toString();
    }

    return (
      <div className="detailDiv">
        <div className="info">
          <h2 className="principalName">{churchName[0]}</h2>
          <p>
            {churchTown} ({churchProvince})
          </p>

          {churchOtherNames && churchOtherNames.length > 0
            ? churchOtherNames.map((item) => <p key={item}>{item}</p>)
            : null}

          {churchArchitectonicStyle && churchArchitectonicStyle.length > 0
            ? churchArchitectonicStyle.map((item) => <p key={item}>{item}</p>)
            : null}
          <p>s.({centuryList})</p>

          <p>Gestionada per: {churchProperty}</p>
          <a href={churchGoogleMapsLink}>googleMaps</a>
          <a href={churchweb} target="_blank" rel="noreferrer">
            web: {churchName[0]}
          </a>

          <p className="description">{churchDescription}</p>
        </div>
        {churchImages && churchImages.length > 0 ? (
          <Carrousel carouselData={churchImages} />
        ) : null}
      </div>
    );
  }

  return <div className="detailDiv"></div>;
};

export default ChurchDetail;
