import React, { useEffect, useState } from "react";
import "./ChurchDetail.css";
import Carrousel from "../../components/Carrousel/Carrousel";

const ChurchDetail = ({ selectedChurch }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    if (selectedChurch) {
      // console.log("entra");
      fetch("http://localhost:5000/churches/id/" + selectedChurch)
        .then((res) => res.json())
        .then((result) => setApiData(result))
        .catch((error) => console.log(error));
    }
  }, [selectedChurch]);

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
    let centuryList = { churchCentury }.churchCentury.toString();

    return (
      <div className="detailDiv">
        <div className="info">
          <h2 className="principalName">{churchName[0]}</h2>
          <p>{churchTown} ({churchProvince})</p>

          {churchOtherNames.map((item) => (
            <p key={item}>{item}</p>
          ))}

          {churchArchitectonicStyle.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <p>s.({centuryList})</p>

            <p>Gestionada per: {churchProperty}</p>
          <a href={churchGoogleMapsLink}>googleMaps</a>
          <a href={churchweb} target="_blank" rel="noreferrer">web: {churchName[0]}</a>

          <p>{churchDescription}</p>
        </div>
        <Carrousel carouselData={churchImages} />
      </div>
    );
  }

  return <div className="detailDiv"></div>;
};

export default ChurchDetail;
