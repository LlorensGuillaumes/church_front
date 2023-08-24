import React, { useEffect, useState } from "react";
import "./StandOutDetails.css";
import Carrousel from "../../components/Carrousel/Carrousel";

const StandOutDetail = ({
  standOutDetailsData,
  selectedChurch,
  buildingDetails,
  setBuildingDetails,
  dataSelect
}) => {
  //const [myData, setMyData] = useState([]);                                                              
  const [newDetailTye, setNewDetailType] = useState("");
  const [newDetailDescription, setNewDetailDesription] = useState("");
  const [newDetailYear, setNewDetailYear] = useState("");
  const [messageError, setMessageError] = useState("");

  
  // useEffect(() => {
  //   if (standOutDetailsData && standOutDetailsData.length > 0) {
  //     //setMyData(standOutDetailsData);
  //   } else {
  //     // setMyData([
  //     //   {
  //     //     detailType: "soy detalle",
  //     //     description: "soy descripcion",
  //     //     year: "soyaños",
  //     //   },
  //     ]);
  //   }
  // }, [standOutDetailsData]);

  const fnAddDetail = () => {
    if (
      newDetailTye !== "" &&
      newDetailTye !== "tipus de detall" &&
      newDetailDescription &&
      newDetailYear
    ) {
      const detailBuilding = {
        detailType: newDetailTye,
        description: newDetailDescription,
        year: newDetailYear,
      };

      setBuildingDetails([...buildingDetails, detailBuilding]);
      setMessageError("");
      setNewDetailDesription("");
      setNewDetailYear("");
    } else {
      setMessageError("Tots el camps són obligatoris");
    }
  };
  
  

  return selectedChurch ? (
    <div className="detailDiv">
     
      {standOutDetailsData && standOutDetailsData.length >0 ? standOutDetailsData.map((item, index) => (
        <div key={index} className="itemsContent">
        <div className="typeYear">
           <p>{item.detailType}</p>
          <p>Any: {item.year}</p>
        </div>
        <div className="description">
          <p >{item.description}</p>
        </div>
         
          
          

        
        </div>
      )):null}
    </div>
  ) : (
    <div className="detailsContent">
      <h1>detalls a destacar</h1>

      {messageError ? <p className="errorMessage">{messageError}</p> : null}
      <div className="newDetail">
        <div className="type_year">
          <select onChange={(e) => setNewDetailType(e.target.value)}>
            <option>tipus de detall</option>
            {dataSelect && dataSelect.length > 0
              ? dataSelect[0].detailType.map((item) => <option key={item}>{item}</option>)
              : null}
          </select>

          <input
            placeholder="Any"
            value={newDetailYear}
            onChange={(e) => setNewDetailYear(e.target.value)}
          ></input>
        </div>
        <textarea
          className="inputDescriptionDetail"
          placeholder="Descripció"
          value={newDetailDescription}
          onChange={(e) => setNewDetailDesription(e.target.value)}
        ></textarea>
      </div>
      <button type="button" onClick={fnAddDetail} className="buttonAdd">
        Add Detail
      </button>

      <div style={{ height: "300px", overflowY: "scroll" }}>
        {buildingDetails && buildingDetails.length > 0
          ? buildingDetails.map((item, index) => (
              <div key={index} className="detailsList">
                <div className="type_year_list">
                  <p className="pList">{item.detailType}</p>
                  <p>{item.year}</p>
                </div>
                <p className="inputDescriptionDetail">{item.description}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default StandOutDetail;
