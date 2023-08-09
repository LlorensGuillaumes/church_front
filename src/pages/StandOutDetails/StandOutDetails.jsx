import React, { useEffect, useState } from "react";
import "./StandOutDetails.css";
import Carrousel from "../../components/Carrousel/Carrousel";

const StandOutDetail = ({ StandOutDetailView, standOutDetailsData }) => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if (standOutDetailsData && standOutDetailsData.length > 0) {
      setMyData(standOutDetailsData);
    } else {
      setMyData([
        {
          detailType: "soy detalle",
          description: "soy descripcion",
          year: "soyaños",
          detailImages: [],
        },
      ]);
    }
  }, [standOutDetailsData]);

  return (
    <div className="detailDiv">
      <h1>SOY DETALLES IMPORTANTES</h1>
      {myData.map((item, index) => (
        <div key={index}>
          <p>{item.detailType}</p>
          <textarea>{item.description}</textarea>
          <p>{item.year}</p>

          {item.detailImages.length > 0 ? <Carrousel carrouselData={item.detailImages} /> : null}
          
        </div>
      ))}
    </div>
  );
};

export default StandOutDetail;
