import React, { useEffect } from "react";
import "./VisibleChurch.css";
import estrella from "../Images/estrella.png";

const VisibleChurch = ({
  visibleChurches,
  setVisibleChurches,
  setSelectedChurch,
  setPrincipalView,
  setFilter,
  apiData,
  actualLocation,
}) => {
  const fnViewDetail = (e) => {
    setSelectedChurch(e);
    setPrincipalView("detail");
    setFilter("StandOut");
  };

  useEffect(() => {
  
    //if (!visibleChurches.length > 0 ){
 
    const sw = [
      parseFloat(actualLocation[0]) - 0.04254,
      parseFloat(actualLocation[1]) - 0.10101,
    ];
    const ne = [
      parseFloat(actualLocation[0]) + 0.011721,
      parseFloat(actualLocation[1]) + 0.1273,
    ];
    const visibleBuildings = apiData.filter((item) => {
      const lat = item.locationGPS[0];
      const lng = item.locationGPS[1];

      return lat >= sw[0] && lat <= ne[0] && lng >= sw[1] && lng <= ne[1];
    });

    const newVisibleChurches = visibleBuildings.map((building) => [
      building._id,
      building.name[0],
      building.locationGPS,
      building.images[0],
      building.puntuation,
    ]);
    setVisibleChurches(newVisibleChurches);

  //}

  }, [actualLocation, apiData]);

  return (
    <div className="listContainer">
      {visibleChurches.map((item, index) => (
        <div
          key={index}
          className="listItem"
          onClick={() => fnViewDetail(item[0])}
        >
          <div className="churchName">
            <p className="churchNameP">{item[1]} </p>
          </div>

          <div className="image_puntuation">
            <div className="imgContainer">
              <img
                className="imgItem"
                src={`https://buildingback.onrender.com/getImages/${item[3]}`}
                alt={`${index}`}
              />
              {item[4] && Array.isArray(item[4]) && item[4].length > 0 && (
                <div className="puntuation">
                  <h1 className="number">
                    {(
                      item[4]
                        .map(Number)
                        .reduce((anterior, actual) => anterior + actual, 0) /
                      item[4].length
                    ).toFixed(1)}
                  </h1>
                </div>
              )}
            </div>
            <div className="estrella">
              <img src={estrella} alt="estrella" className="picture"></img>
            </div>
            <div className="numVal">
              <div>{item[4] && <label>{item[4].length}</label>}</div>
              vots
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisibleChurch;
