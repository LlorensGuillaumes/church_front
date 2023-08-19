import React, { useEffect, useState } from "react";
import "./Filter.css";

const Filter = ({
  apiData,
  setDataFiltered,
  
}) => {
  const [filterItems, setFilterItems] = useState({
    architectonicStyle: [],
    centuryList: [],
    detailTypes: [],
    buildTypes: [],
  });

  const [allCheckboxesSelected, setAllCheckboxesSelected] = useState(true);

  useEffect(() => {
    let filteredData = [...apiData];

    if (filterItems.architectonicStyle.length > 0) {
      filteredData = filteredData.filter((element) =>
        filterItems.architectonicStyle.some((style) =>
          element.architectonicStyle.includes(style)
        )
      );
    }

    if (filterItems.centuryList.length > 0) {
      filteredData = filteredData.filter((element) =>
        filterItems.centuryList.some((century) =>
          element.century.includes(century)
        )
      );
    }

    if (filterItems.buildTypes.length > 0) {
      filteredData = filteredData.filter((element) =>
        filterItems.buildTypes.some((type) => element.buildType.includes(type))
      );
    }

    if (filterItems.detailTypes.length > 0) {
      filteredData = filteredData.filter((element) =>
        filterItems.detailTypes.some((detailType) =>
          element.churchDetail.some(
            (churchDetail) => churchDetail.detailType === detailType
          )
        )
      );
    }

    setDataFiltered(filteredData);
  }, [filterItems, apiData, setDataFiltered]);

  
  
  

  const centuries = [];
  const architectonicStyles = [];
  const detailTypes = [];
  const buildTypeList = [];

  for (const church of apiData) {
    const centuryList = church.century;
    const architectonicStyleList = church.architectonicStyle;
    const details = church.churchDetail;
    const buildType = church.buildType;

    if (!buildTypeList.includes(buildType) && buildType !== "") {
      buildTypeList.push(buildType);
    }

    for (const detail of details) {
      const detailType = detail.detailType;
      if (!detailTypes.includes(detailType) && detailType !== "") {
        detailTypes.push(detailType);
      }
    }

    for (const century of centuryList) {
      if (!centuries.includes(century) && century !== "") {
        centuries.push(century);
      }
    }

    for (const architectonicStyle of architectonicStyleList) {
      if (
        !architectonicStyles.includes(architectonicStyle) &&
        architectonicStyle !== ""
      ) {
        architectonicStyles.push(architectonicStyle);
      }
    }
  }

  const handleToggleAllCheckboxes = () => {
    setAllCheckboxesSelected((prev) => !prev);
    if (allCheckboxesSelected) {
      setFilterItems({
        architectonicStyle: architectonicStyles,
        centuryList: centuries,
        detailTypes: detailTypes,
        buildTypes: buildTypeList,
      });
    } else {
      setFilterItems({
        architectonicStyle: [],
        centuryList: [],
        detailTypes: [],
        buildTypes:[],
      });
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
    setFilterItems((prevFilterItems) => ({
      ...prevFilterItems,
      [name]: checked
        ? [...prevFilterItems[name], value]
        : prevFilterItems[name].filter((item) => item !== value),
    }));
  };

  return (
    <div className="bigFilterContainer">
      <div className="selectAll">
        <input type="checkbox" onChange={handleToggleAllCheckboxes} />
        <label>MOSTRAR / AMAGAR TOTS</label>
      </div>
      <div className="filterContainer">
        <div className="columnItems">
          <h3>Estils arquitectònics</h3>
          <div className="stylesItems">
            {architectonicStyles.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="architectonicStyle"
                  value={item}
                  checked={filterItems.architectonicStyle.includes(item)}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="columnItems">
          <h3>Tipus de Construcció</h3>
          <div className="stylesItems">
            {buildTypeList.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="buildTypes"
                  value={item}
                  checked={filterItems.buildTypes?.includes(item)}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="columnItems">
          <h3>Segles</h3>
          <div className="stylesItems">
            {centuries.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  name="centuryList"
                  value={item}
                  checked={filterItems.centuryList.includes(item)}
                  onChange={handleCheckboxChange}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {detailTypes && detailTypes.length > 0 ? (
          <div className="columnItems">
            <h3>Detalls</h3>
            <div className="stylesItems">
              {detailTypes.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    name="detailTypes"
                    value={item}
                    checked={filterItems.detailTypes.includes(item)}
                    onChange={handleCheckboxChange}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
