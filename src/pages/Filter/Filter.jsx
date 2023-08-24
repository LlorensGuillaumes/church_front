import React, { useEffect, useState } from "react";
import "./Filter.css";
import api from "../../shared/API/Api";
import esglesia from "../../components/Images/esglesia.png";
import castell from "../../components/Images/castell.png";

const Filter = ({
  apiData,
  setDataFiltered,
  dataFiltered,
}) => {
  let filterItems = {
    architectonicStyle: [],
    centuryList: [],
    detailTypes: [],
    buildTypes: [],
    center: [],
    zoom: 10,
  };
  const dataToFiltered = [...apiData];

  const [isArchitenctonicStylesVisible, setIsArchitectonicStylesVisible] =
    useState(false);
  const [isConstruccionTypeVisible, setIsConstruccionTypeVisible] =
    useState(false);
  const [isCenturyVisible, setIsCenturyVisible] = useState(false);
  const [isDetallesVisible, setIsDetallesVisible] = useState(false);
  //const [isTownVisible, setIsTownVisible] = useState(false);
  //const [townsData, setTownsData] = useState([]);


  const toggleClass = (index, category) => {
    if (category === "architectonicStyle") {
      const newArchitectonicStates = [...architectonicStylesStates];
      newArchitectonicStates[index][0] = !newArchitectonicStates[index][0];
      setArchitectonicStylesStates(newArchitectonicStates);
    }

    if (category === "buildinState") {
      const newBuildingStatates = [...BuildingTypesStates];
      newBuildingStatates[index][0] = !newBuildingStatates[index][0];
      SetBuildinTypeslesStates(newBuildingStatates);
    }

    if (category === "century") {
      console.log(index)
      const newCenturyStates = [...centuriesStates];
      newCenturyStates[index][0] = !newCenturyStates[index][0];
      setCenturiesStylesStates(newCenturyStates);
    }

    if (category === "Detail") {
      console.log(index)
      const newDetailTypesStates = [...detailTypesStates];
      newDetailTypesStates[index][0] = !newDetailTypesStates[index][0];
      setDetailTypesStates(newDetailTypesStates);
    }

  };

  for (const building of apiData) {
    if (building.buildType) {
      if (!filterItems.buildTypes.includes(building.buildType)) {
        filterItems.buildTypes.push(building.buildType);
      }
    }
    if (building.architectonicStyle.length > 0) {
      for (const architectonicStyle of building.architectonicStyle) {
        if (!filterItems.architectonicStyle.includes(architectonicStyle)) {
          filterItems.architectonicStyle.push(architectonicStyle);
          
        }
      }
    }

    if (building.century.length > 0) {
      for (const century of building.century) {
        if (!filterItems.centuryList.includes(century)) {
          filterItems.centuryList.push(century);
        }
      }
    }
    if (building.churchDetail.length > 0) {
      for (const detail of building.churchDetail) {
        if (!filterItems.detailTypes.includes(detail)) {
          filterItems.detailTypes.push(detail);
        }
      }
    }
  }



  const detalles = filterItems.detailTypes.map((item) => item.detailType);

  const filter = () => {

    
    const arrFilterArchitectonicStyle = architectonicStylesStates.filter(([bool]) => bool).map(([_, item]) => item);
    const arrFilterBuildingType = BuildingTypesStates.filter(([bool]) => bool).map(([_, item]) => item);
    const arrFilterCentury = centuriesStates.filter(([bool]) => bool).map(([_, item]) => item);
    const arrFilterDetailTypes = detailTypesStates.filter(([bool]) => bool).map(([_, item]) => item);
 

    const arrDataFiltered = [];


    for (const building of dataToFiltered) {
      if(arrFilterArchitectonicStyle.some(value => building.architectonicStyle.includes(value))){
        arrDataFiltered.push(building)

      }else if (arrFilterBuildingType.some(value => building.buildType.includes(value))){
        arrDataFiltered.push(building)



      }else if (arrFilterCentury.some(value => building.century.includes(value))){
        arrDataFiltered.push(building)

      }else if (arrFilterDetailTypes.some(value => building.churchDetail.some(detail => detail.detailType === value))) {
        arrDataFiltered.push(building)

        
      }
    }
    
    setDataFiltered((prevDataFiltered) => ({
      ...prevDataFiltered,
      data: arrDataFiltered,
    }))
    

    
  
  };

  useEffect(() =>{
    
  }, [dataFiltered])

 
 
  const [architectonicStylesStates, setArchitectonicStylesStates] = useState(
    filterItems.architectonicStyle.map((item) =>[false, item])
    //Array(filterItems.architectonicStyle.length).fill(true)
  );
  const [BuildingTypesStates, SetBuildinTypeslesStates] = useState(
    filterItems.buildTypes.map((item) =>[false, item])
    //Array(filterItems.buildTypes.length).fill(true)
  );

  const [centuriesStates, setCenturiesStylesStates] = useState(
    filterItems.centuryList.map((item) =>[false, item])
    //Array(filterItems.centuryList.length).fill(true)
  );
  const [detailTypesStates, setDetailTypesStates] = useState(
    filterItems.detailTypes.map((item) =>[false, item.detailType])
    //Array(filterItems.detailTypes.length).fill(true)
  );

  
  return (
    <div className="bigFilterContainer">
      <div
        className="filterContainer"
        onClick={() => {
          filter();
        }}
      >
        <h2>Aplicar Filtres</h2>
      </div>

      <div className="filterContainer">

        <div className="columnItems">
          <div
            className="titleBtn"
            onClick={() =>
              setIsArchitectonicStylesVisible(!isArchitenctonicStylesVisible)
            }
          >
            <h3>Estils arquitectònics</h3>
          </div>
          {isArchitenctonicStylesVisible && (
            <div className="stylesItems">
              {filterItems.architectonicStyle.map((item, index) => (
                <div
                  key={index}
                  className={`filterItems ${
                    architectonicStylesStates[index][0] ? "activated" : ""
                  }`}
                  onClick={() => toggleClass(index, 'architectonicStyle')}
                  title={item}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="columnItems">
          <div
            className="titleBtn"
            onClick={() =>
              setIsConstruccionTypeVisible(!isConstruccionTypeVisible)
            }
          >
            <h3>Tipus de Construcció</h3>
          </div>
          {isConstruccionTypeVisible && (
            <div className="stylesItems" >
              {filterItems.buildTypes.map((item, index) => (
                <div
                  key={index}
                  className={`filterItems ${
                    BuildingTypesStates[index][0] ? "activated" : ""
                  }`}
                  onClick={() => toggleClass(index, 'buildinState')}
                  title={item}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="columnItems">
          <div
            className="titleBtn"
            onClick={() => setIsCenturyVisible(!isCenturyVisible)}
          >
            <h3>Segles</h3>
          </div>
          {isCenturyVisible && (
            <div className="stylesItems">
              {filterItems.centuryList.map((item, index) => (
                <div
                  key={index}
                  className={`filterItems ${
                    centuriesStates[index][0] ? "activated" : ""
                  }`}
                  onClick={() => toggleClass(index, 'century')}
                  title={item}
                >
                  <h1>{item}</h1>
                </div>
              ))}
            </div>
          )}
        </div>

        {detalles && detalles.length > 0 && (
          <div className="columnItems">
            <div
              className="titleBtn"
              onClick={() => {
                setIsDetallesVisible(!isDetallesVisible);
              }}
            >
              <h3>Detalls</h3>
            </div>
            {isDetallesVisible && (
              <div className="stylesItems">
                {detalles.map((item, index) => (
                  <div
                    key={index}
                    className={`filterItems ${
                      detailTypesStates[index][0] ? "activated" : ""
                    }`}
                    onClick={() => toggleClass(index, 'Detail')}
                    title={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
