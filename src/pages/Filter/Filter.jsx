import React, { useEffect, useState } from "react";
import "./Filter.css";

const Filter = ({
  setFilter,
  apiData,
  setDataFiltered,
  currentFilterItems,
  setCurrentFilterItems,
}) => {
  const [filterItems, setFilterItems] = useState({
    architectonicStyle: [],
    centuryList: [],
    detailTypes: [],
  });

  const [allCheckboxesSelected, setAllCheckboxesSelected] = useState(true);

  useEffect(() => {
    if (currentFilterItems) {
      setFilterItems(currentFilterItems);
    }
  }, [currentFilterItems]);

  const handleToggleAllCheckboxes = () => {
    setAllCheckboxesSelected((prev) => !prev);
    if (allCheckboxesSelected) {
      setFilterItems({
        architectonicStyle: architectonicStyles,
        centuryList: centuries,
        detailTypes: detailTypes,
      });
    } else {
      setFilterItems({
        architectonicStyle: [],
        centuryList: [],
        detailTypes: [],
      });
    }
  };

  const fnFiltrar = () => {
    let filterOK = [];

    for (const element of apiData) {
      if (filterItems.architectonicStyle.length > 0) {
        for (const style of filterItems.architectonicStyle) {
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
    setCurrentFilterItems(filterItems);
  };

  const centuries = [];
  const architectonicStyles = [];
  const detailTypes = [];

  for (const church of apiData) {
    const centuryList = church.century;
    const architectonicStyleList = church.architectonicStyle;
    const details = church.churchDetail;

    for (const detail of details) {
      const detailType = detail.detailType;
      if (!detailTypes.includes(detailType)) {
        detailTypes.push(detailType);
      }
    }

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
        {/* <button onClick={handleToggleAllCheckboxes}>{allCheckboxesSelected ? "MARCAR TOTS" : "ESBORRAR TOTS"}</button> */}
      </div>
      <div className="btnAplicateFilters">
        <button onClick={fnFiltrar}> APLICAR FILTRES </button>
      </div>
    </div>
  );
};

export default Filter;
