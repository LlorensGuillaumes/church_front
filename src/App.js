import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar/navBar.jsx";
import MapView from "./pages/Mapa/Mapa.jsx";
import ChurchDetail from "./pages/ChurchDetail/ChurchDetail";
import Filter from "./pages/Filter/Filter";
import NewChurch from "./pages/NewChurch/NewChurch";

function App() {
  const [selectedChurch, setSelectedChurch] = useState("");
  const [apiData, setApiData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterItems, setFilterItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/churches")
      .then((res) => res.json())
      .then((result) => {
        setApiData(result);
        setDataFiltered(result);
        setFilterItems({
          architectonicStyle: true,
          Centuries: true,
          detailTypes: true,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(selectedChurch)
  // console.log(apiData)

  return (
    <div className="initStyles">
      <NavBar setFilter={setFilter} />
      <div className="mapAndDetail">
        <div className="mapView">
          {/* <MapView
            className="mapView"
            setSelectedChurch={setSelectedChurch}
            dataFiltered={dataFiltered}
            setFilter={setFilter}
          /> */}
          <NewChurch />
        </div>
        {filter === "filter" ? (
          <Filter
            className="ChurchDetail"
            setFilter={setFilter}
            apiData={apiData}
            setDataFiltered={setDataFiltered}
            setFilterItems={setFilterItems}
            FilterItems={filterItems}
          />
        ) : filter === "detail" ? (
          <ChurchDetail
            className="ChurcDetail"
            selectedChurch={selectedChurch}
            setFilter={setFilter}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
