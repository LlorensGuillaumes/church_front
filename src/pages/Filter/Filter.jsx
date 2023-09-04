import React, { useEffect, useState } from "react";
import "./Filter.css";
import api from "../../shared/API/Api";
import esglesia from "../../components/Images/buildingTypes/esglesia.jpg";
import castell from "../../components/Images/buildingTypes/castell.jpg";
import convent from "../../components/Images/buildingTypes/convent.jpg";
import romanic from "../../components/Images/architectonicStyles/romànic.jpg";
import gotic from "../../components/Images/architectonicStyles/gótic.jpg";
import renaixentista from "../../components/Images/architectonicStyles/renaixentista.jpg";
import barroc from "../../components/Images/architectonicStyles/barroc.jpg";
import cistersenc from "../../components/Images/architectonicStyles/cistersenc.jpg";
import campanar from "../../components/Images/buildinDetail/campanar.jpg";
import enterrament from "../../components/Images/buildinDetail/enterrament.jpg";
import estrella from "../../components/Images/estrella.png";
import estrellaBlanca from "../../components/Images/estrellaBlanca.png";

const Filter = ({
  apiData,
  setDataFiltered,
  dataFiltered,
  setFilter,
  setBtnFilteText,
  isSmallScreen,
  setPrincipalView,
}) => {
  let filterItems = {
    architectonicStyle: [],
    centuryList: [],
    detailTypes: [],
    buildTypes: [],
    center: [],
    zoom: 12,
  };
  const dataToFiltered = [...apiData];

  const [isArchitenctonicStylesVisible, setIsArchitectonicStylesVisible] =
    useState(false);
  const [isConstruccionTypeVisible, setIsConstruccionTypeVisible] =
    useState(false);
  const [isCenturyVisible, setIsCenturyVisible] = useState(false);
  const [isDetallesVisible, setIsDetallesVisible] = useState(false);
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [noFiltererItems, setNoFilterItems] = useState(false);
  const [imagesStates, setImageStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const romanToArabic = (roman) => {
    switch (roman) {
      case "I":
        return 1;
      case "II":
        return 2;
      case "III":
        return 3;
      case "IV":
        return 4;
      case "V":
        return 5;
      case "VI":
        return 6;
      case "VII":
        return 7;
      case "VIII":
        return 8;
      case "IX":
        return 9;
      case "X":
        return 10;
      case "XI":
        return 11;
      case "XII":
        return 12;
      case "XIII":
        return 13;
      case "XIV":
        return 14;
      case "XV":
        return 15;
      case "XVI":
        return 16;
      case "XVII":
        return 17;
      case "XVIII":
        return 18;
      case "XIX":
        return 19;
      case "XX":
        return 20;
      case "XXI":
        return 21;

      default:
        return "error";
    }
  };

  const arabicToRoman = (arabic) => {
    switch (arabic) {
      case 1:
        return "I";
      case 2:
        return "II";
      case 3:
        return "III";
      case 4:
        return "IV";
      case 5:
        return "V";
      case 6:
        return "VI";
      case 7:
        return "VII";
      case 8:
        return "VIII";
      case 9:
        return "IX";
      case 10:
        return "X";
      case 11:
        return "XI";
      case 12:
        return "XII";
      case 13:
        return "XIII";
      case 14:
        return "XIV";
      case 15:
        return "XV";
      case 16:
        return "XVI";
      case 17:
        return "XVII";
      case 18:
        return "XVIII";
      case 19:
        return "XIX";
      case 20:
        return "XX";
      case 21:
        return "XXI";

      default:
        return "error";
    }
  };

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
      const newCenturyStates = [...centuriesStates];
      newCenturyStates[index][0] = !newCenturyStates[index][0];
      setCenturiesStylesStates(newCenturyStates);
    }

    if (category === "Detail") {
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
        if (!filterItems.detailTypes.includes(detail.detailType)) {
          filterItems.detailTypes.push(detail.detailType);
        }
      }
    }
  }

  const arabicCentury = [];

  for (const century of filterItems.centuryList) {
    arabicCentury.push(romanToArabic(century));
  }

  const centuryArabicSort = arabicCentury.sort((a, b) => a - b);

  const romanCentury = [];

  for (const century of centuryArabicSort) {
    romanCentury.push(arabicToRoman(century));
  }
  filterItems.centuryList = romanCentury;

  const detalles = filterItems.detailTypes.map((item) => item);

  const filter = () => {
    const arrFilterArchitectonicStyle = architectonicStylesStates
      .filter(([bool]) => bool)
      .map(([_, item]) => item);
    const arrFilterBuildingType = BuildingTypesStates.filter(
      ([bool]) => bool
    ).map(([_, item]) => item);
    const arrFilterCentury = centuriesStates
      .filter(([bool]) => bool)
      .map(([_, item]) => item);
    const arrFilterDetailTypes = detailTypesStates
      .filter(([bool]) => bool)
      .map(([_, item]) => item);

    const arrDataFiltered = [];

    for (const building of dataToFiltered) {
      if (
        arrFilterArchitectonicStyle.some((value) =>
          building.architectonicStyle.includes(value)
        )
      ) {
        arrDataFiltered.push(building);
      } else if (
        arrFilterBuildingType.some((value) =>
          building.buildType.includes(value)
        )
      ) {
        arrDataFiltered.push(building);
      } else if (
        arrFilterCentury.some((value) => building.century.includes(value))
      ) {
        arrDataFiltered.push(building);
      } else if (
        arrFilterDetailTypes.some((value) =>
          building.churchDetail.some((detail) => detail.detailType === value)
        )
      ) {
        arrDataFiltered.push(building);
      }
    }
    const minValoration = (imagesStates.filter((item)=> item === true).length)
    console.log(arrDataFiltered.filter((item) => (
      item.puntuation.reduce((suma, actual) => suma + actual )/item.puntuation.length) >= minValoration)
    )

    if (arrDataFiltered.length > 0) {
      setDataFiltered((prevDataFiltered) => ({
        ...prevDataFiltered,
        data: arrDataFiltered,
      }));
    } else {
      setNoFilterItems(true);
    }
  };

  useEffect(() => {}, [dataFiltered]);

  const [architectonicStylesStates, setArchitectonicStylesStates] = useState(
    filterItems.architectonicStyle.map((item) => [false, item])
  );
  const [BuildingTypesStates, SetBuildinTypeslesStates] = useState(
    filterItems.buildTypes.map((item) => [false, item])
  );

  const [centuriesStates, setCenturiesStylesStates] = useState(
    filterItems.centuryList.map((item) => [false, item])
  );
  const [detailTypesStates, setDetailTypesStates] = useState(
    filterItems.detailTypes.map((item) => [false, item])
  );

  const toggleImage = (index) => {
    const initialStates = Array(imagesStates.length).fill(false);
    const updatedStates = initialStates.map((state, i) => {
      if (i <= index) {
        return true;
      }
      return state;
    });
    setImageStates(updatedStates);
  };

  return (
    <div className="bigFilterContainer">
      {!noFiltererItems && (
        <div
          className="filterContainer"
          onClick={() => {
            filter();
          }}
        >
          <h2>Aplicar Filtres</h2>
        </div>
      )}

      {noFiltererItems && (
        <div className="noFilterSelect">
          <h4>No has seleccionat cap filtre</h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="btnNavbar"
              onClick={() => {
                setDataFiltered((prevDataFiltered) => ({
                  ...prevDataFiltered,
                  data: dataToFiltered,
                }));
                isSmallScreen
                  ? setPrincipalView("mapView")
                  : setFilter("listView");

                setBtnFilteText("FILTRAR");
              }}
            >
              mostrar tots
            </button>
            <button
              className="btnNavbar"
              onClick={() => {
                setNoFilterItems(false);
              }}
            >
              filtrar
            </button>
          </div>
        </div>
      )}

      {!noFiltererItems && (
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
                    onClick={() => toggleClass(index, "architectonicStyle")}
                    title={item}
                  >
                    <img
                      src={
                        item === "Romànic"
                          ? romanic
                          : item === "Gòtic"
                          ? gotic
                          : item === "Renaixentista"
                          ? renaixentista
                          : item === "Barroc"
                          ? barroc
                          : item === "Cistercenc"
                          ? cistersenc
                          : castell
                      }
                      alt={index}
                      className="imagesIcons"
                    />
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
              <div className="stylesItems">
                {filterItems.buildTypes.map((item, index) => (
                  <div
                    key={index}
                    className={`filterItems ${
                      BuildingTypesStates[index][0] ? "activated" : ""
                    }`}
                    onClick={() => toggleClass(index, "buildinState")}
                    title={item}
                  >
                    <img
                      src={
                        item === "Castell"
                          ? castell
                          : item === "Esglèsia"
                          ? esglesia
                          : item === "Convent / Monestir"
                          ? convent
                          : castell
                      }
                      alt={index}
                      className="imagesIcons"
                    />
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
                    onClick={() => toggleClass(index, "century")}
                    title={item}
                  >
                    <div className="romanNumberContainer">
                      <h1 className="romanNumber">{item}</h1>
                    </div>
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
                      onClick={() => toggleClass(index, "Detail")}
                      title={item}
                    >
                      <img
                        src={
                          item === "Torre / Campanar"
                            ? campanar
                            : item === "Enterrament"
                            ? enterrament
                            : campanar
                        }
                        alt={index}
                        className="imagesIcons"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="columnItems">
            <div
              className="titleBtn"
              onClick={() => {
                setIsNoteVisible(!isNoteVisible);
              }}
            >
              <h3>Puntuació</h3>
            </div>
            {isNoteVisible && (
              <div className="markPuntuation">
                {imagesStates.map((isEstrellaVisible, index) => (
                  <div
                    key={index}
                    className="AddPuntuationContainer"
                    onClick={() => toggleImage(index)}
                  >
                    <img
                      src={isEstrellaVisible ? estrella : estrellaBlanca}
                      alt="estrella"
                      className="addPuntuationItem"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
