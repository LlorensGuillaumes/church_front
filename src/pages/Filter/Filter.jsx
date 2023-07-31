import React, { useState } from "react";

const Filter = ({ setFilter, apiData, setDataFiltered }) => {
  const [filterItems, setFilterItems] = useState({
    architectonicStyle: [],
    centuryList: [],
    detailTypes: [],
  });

  const fnFiltrar = () => {
    // console.log(filterItems);
    let filterOK = [];

    // console.log(apiData);
    for (const element of apiData) {
      // console.log("ELEMENT");
      // console.log(element);

      if (filterItems.architectonicStyle.length > 0) {
        // console.log("té architectonicStyles");
        for (const style of filterItems.architectonicStyle) {
          // console.log("style");
          // console.log(style);
          if (element.architectonicStyle.includes(style)) {
            if (!filterOK.includes(element)) {
              filterOK.push(element);
              break;
            }
          }
        }
      }

      if (filterItems.centuryList.length > 0) {
        for (const century of filterItems.centuryList) {
          if (element.century.includes(century)) {
            if (!filterOK.includes(element)) {
              filterOK.push(element);
              break;
            }
          }
        }
      }

      if (filterItems.detailTypes.length > 0) {
        for (const detailType of filterItems.detailTypes) {
          for (const churchDetail of element.churchDetail) {
            if (churchDetail.detailType === detailType) {
              if (!filterOK.includes(element)) {
                filterOK.push(element);
                break;
              }
            }
          }
        }
      }
    }

    setDataFiltered(filterOK);

    setFilter("filter");
  };

  // console.log(apiData);

  const centuries = [];
  const architectonicStyles = [];
  const detailTypes = [];

  for (const church of apiData) {
    const centuryList = church.century;
    const architectonicStyleList = church.architectonicStyle;
    const details = church.churchDetail;

    // console.log(details);

    for (const detail of details) {
      const detailType = detail.detailType;
      if (!detailTypes.includes(detailType)) {
        detailTypes.push(detailType);
      }
    }

    // console.log(detailTypes);

    for (const century of centuryList) {
      if (!centuries.includes(century)) {
        centuries.push(century);
      }
    }

    for (const architectonicStyle of architectonicStyleList) {
      if (!architectonicStyles.includes(architectonicStyle)) {
        architectonicStyles.push(architectonicStyle);
      }
    }
  }

  // console.log(centuries);
  // console.log(architectonicStyles);
  // console.log(detailTypes);

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
    <div>
      <div className="architectonicStyle">
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
      <div className="centuryList">
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
      <div className="detailType">
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
      <button onClick={fnFiltrar}> APLICAR FILTROS </button>
    </div>
  );
};

export default Filter;
