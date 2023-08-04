import React, { useEffect, useState } from "react";
import "./ChurchDetail.css";
import Carrousel from "../../components/Carrousel/Carrousel";

const ChurchDetail = ({ selectedChurch, preViewNewChurch, setDataType, dataType }) => {
  const [apiData, setApiData] = useState([]);
  

  useEffect(() => {
    if (selectedChurch) {
      setDataType('exist')
      fetch("http://localhost:5000/churches/id/" + selectedChurch)
        .then((res) => res.json())
        .then((result) => setApiData(result))
        .catch((error) => console.log(error));
    } else if (preViewNewChurch.length > 0) {
      setDataType('new')
      setApiData(preViewNewChurch);
    }
  }, [selectedChurch, preViewNewChurch]);

  // useEffect(() => {
  //   if (apiData.length > 0) {
  //     const imagesFromApiData = {
  //       images: apiData[0].images,
  //     }
  //     console.log (imagesFromApiData)
  //     if (imagesFromApiData.images.length > 0) {
  //       console.log('entra')
  //       fetch(`http://localhost:5000/churches/getImages/${imagesFromApiData.images}`)
  //         .then((res) => res.json())
  //         .then((response) => {
  //           setChurchImagesURL(response);
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   }
  // }, [apiData]);

  if (apiData.length > 0) {
    const churchName = apiData[0].name;
    const churchDescription = apiData[0].description;
    const churchTown = apiData[0].townLocation;
    const churchProvince = apiData[0].churchProvince;
    const churchGoogleMapsLink = "https://www.google.es/";
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
console.log(churchImages)
    return (
      <div className="detailDiv">
        <div className="info">
          <h2 className="principalName">{churchName[0]}</h2>
          {churchProvince !== '' ? 
            <p>{churchTown} ({churchProvince})</p> 
            : <p>{churchTown}</p> }

          {churchOtherNames && churchOtherNames.length > 0
            ? churchOtherNames.map((item) => <p key={item}>{item}</p>)
            : null}

          {churchArchitectonicStyle && churchArchitectonicStyle.length > 0
            ? churchArchitectonicStyle.map((item) => <p key={item}>{item}</p>)
            : null}

          {centuryList ? <p>s.({centuryList})</p> : null}
          

          {churchProperty ? <p>Gestionada per: {churchProperty}</p> : null}
          {churchGoogleMapsLink ? <a href={churchGoogleMapsLink}>googleMaps</a> : null}
          {churchweb ? <a href={churchweb} target="_blank" rel="noreferrer"> web: {churchName[0]}</a> : null}

          <p className="description">{churchDescription}</p>
        </div>
        {churchImages && churchImages.length > 0 ? (
          <Carrousel carouselData={churchImages} dataType={dataType} />
        ) : null}
      </div>
    );
  }

  return <div className="detailDiv"></div>;
};

export default ChurchDetail;
