import React from "react";
import "./VisibleChurch.css";
import estrella from "../Images/estrella.png";

const VisibleChurch = ({
  visibleChurches,
  setSelectedChurch,
  setPrincipalView,
  setFilter,
}) => {
  const fnViewDetail = (e) => {
    setSelectedChurch(e);
    setPrincipalView("detail");
    setFilter("StandOut");
  };

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
                src={`http://localhost:5000/churches/getImages/${item[3]}`}
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
            <div>
              {item[4].length}
            </div>
               vots
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisibleChurch;
