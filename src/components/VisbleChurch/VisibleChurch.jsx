import React from "react";
import "./VisibleChurch.css";

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
          <p className="churchName">{item[1]} </p>
          <div className="imgContainer">
            <img
              className="imgItem"
              src={`http://localhost:5000/churches/getImages/${item[3]}`}
              alt={`${index}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisibleChurch;
